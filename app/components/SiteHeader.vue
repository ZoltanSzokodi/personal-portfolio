<script setup lang="ts">
import { siteConfig } from '#shared/data/site'

type SectionId = 'projects' | 'about' | 'contact'

interface NavItem {
  label: string
  sectionId?: SectionId
}

const navItems: NavItem[] = [
  { label: 'EXPERIENCE' },
  { label: 'PROJECTS', sectionId: 'projects' },
  { label: 'THE STACK' },
  { label: 'ABOUT ME', sectionId: 'about' },
  { label: 'CONTACT', sectionId: 'contact' },
]

const SCROLL_END_FALLBACK_DELAY = 150
const NAVIGATION_UNLOCK_SAFETY_DELAY = 2000

const route = useRoute()
const activeSection = ref<SectionId | null>(null)
let sections: HTMLElement[] = []
let animationFrame: number | undefined
let navigationUnlockTimer: ReturnType<typeof setTimeout> | undefined
let lockedSection: SectionId | null = null
let supportsScrollEnd = false

const updateActiveSection = () => {
  animationFrame = undefined

  if (lockedSection) {
    activeSection.value = lockedSection
    return
  }

  const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0
  const markerPosition = window.scrollY + headerHeight + window.innerHeight * 0.2
  let nextActiveSection: SectionId | null = null

  for (const section of sections) {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY

    if (sectionTop > markerPosition) break
    nextActiveSection = section.id as SectionId
  }

  activeSection.value = nextActiveSection
}

const unlockNavigation = () => {
  if (navigationUnlockTimer !== undefined) {
    window.clearTimeout(navigationUnlockTimer)
    navigationUnlockTimer = undefined
  }

  lockedSection = null
  updateActiveSection()
}

const scheduleNavigationUnlock = (delay: number) => {
  if (navigationUnlockTimer !== undefined) {
    window.clearTimeout(navigationUnlockTimer)
  }

  navigationUnlockTimer = window.setTimeout(unlockNavigation, delay)
}

const scheduleActiveSectionUpdate = () => {
  if (animationFrame === undefined) {
    animationFrame = window.requestAnimationFrame(updateActiveSection)
  }
}

const handleScroll = () => {
  scheduleActiveSectionUpdate()

  if (lockedSection && !supportsScrollEnd) {
    scheduleNavigationUnlock(SCROLL_END_FALLBACK_DELAY)
  }
}

const handleScrollEnd = () => {
  if (lockedSection) unlockNavigation()
}

const refreshSections = () => {
  sections = navItems.flatMap((item) => {
    if (!item.sectionId) return []

    const section = document.getElementById(item.sectionId)
    return section ? [section] : []
  })

  if (!sections.length) {
    activeSection.value = null
    return
  }

  scheduleActiveSectionUpdate()
}

const selectSection = (sectionId: SectionId) => {
  lockedSection = sectionId
  activeSection.value = sectionId
  scheduleNavigationUnlock(NAVIGATION_UNLOCK_SAFETY_DELAY)
}

onMounted(() => {
  supportsScrollEnd = 'onscrollend' in window
  refreshSections()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', scheduleActiveSectionUpdate)

  
  
  if (supportsScrollEnd) {
    document.addEventListener('scrollend', handleScrollEnd)
  }
})

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    refreshSections()
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', scheduleActiveSectionUpdate)

  if (supportsScrollEnd) {
    document.removeEventListener('scrollend', handleScrollEnd)
  }

  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
  if (navigationUnlockTimer !== undefined) window.clearTimeout(navigationUnlockTimer)
})

</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/" :aria-label="`${siteConfig.name}, home`">
        <span class="brand-mark" aria-hidden="true">{{ siteConfig.initials }}</span>
        <span class="brand-name">{{ siteConfig.name }}</span>
      </NuxtLink>

      <nav aria-label="Primary navigation">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.label">
            <NuxtLink
              v-if="item.sectionId"
              class="nav-link"
              :class="{ 'nav-link--active': activeSection === item.sectionId }"
              :to="{ path: '/', hash: `#${item.sectionId}` }"
              :aria-current="activeSection === item.sectionId ? 'location' : undefined"
              @click="selectSection(item.sectionId)"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              v-else
              class="nav-link nav-link--placeholder"
              href="#"
              aria-disabled="true"
              @click.prevent
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid var(--color-line-soft);
}

.header-inner {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  font-weight: 720;
  letter-spacing: -0.02em;
  text-decoration: none;
}

nav {
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

nav::-webkit-scrollbar {
  display: none;
}

.brand-mark {
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  border-radius: 0.75rem;
  background: var(--color-text);
  color: var(--color-bg);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 3vw, 2rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  position: relative;
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  color: var(--color-muted);
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0.4rem;
  left: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-text);
}

.nav-link:hover::after,
.nav-link--active::after {
  transform: scaleX(1);
}

.nav-link--placeholder {
  opacity: 0.52;
  cursor: default;
}

.nav-link--placeholder:hover {
  color: var(--color-muted);
}

.nav-link--placeholder::after {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}

@media (max-width: 34rem) {
  .brand-name {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .header-inner {
    gap: 1rem;
  }
}
</style>
