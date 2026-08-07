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
const menuButton = ref<HTMLButtonElement | null>(null)
const mobileMenuDialog = ref<HTMLDialogElement | null>(null)
const isMobileMenuOpen = ref(false)
let sections: HTMLElement[] = []
let animationFrame: number | undefined
let navigationUnlockTimer: ReturnType<typeof setTimeout> | undefined
let lockedSection: SectionId | null = null
let supportsScrollEnd = false
let isMobileMenuClosing = false
let shouldRestoreMenuButtonFocus = true
let desktopMediaQuery: MediaQueryList | undefined

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

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const openMobileMenu = () => {
  const dialog = mobileMenuDialog.value
  if (!dialog || dialog.open) return

  isMobileMenuOpen.value = true
  dialog.showModal()
  document.documentElement.classList.add('mobile-menu-open')

  if (!prefersReducedMotion()) {
    dialog.animate(
      [
        { opacity: 0, transform: 'translateX(100%)' },
        { opacity: 1, transform: 'translateX(0)' },
      ],
      {
        duration: 240,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    )
  }
}

const closeMobileMenu = async (restoreFocus = true) => {
  shouldRestoreMenuButtonFocus = restoreFocus

  const dialog = mobileMenuDialog.value
  if (!dialog?.open || isMobileMenuClosing) return

  isMobileMenuClosing = true
  dialog.getAnimations().forEach((animation) => animation.cancel())

  if (!prefersReducedMotion()) {
    const animation = dialog.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(100%)' },
      ],
      {
        duration: 180,
        easing: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    )

    try {
      await animation.finished
    } catch {
      // Closing can safely continue if the animation is interrupted.
    }
  }

  if (dialog.open) dialog.close()
}

const handleMobileMenuClosed = () => {
  isMobileMenuOpen.value = false
  isMobileMenuClosing = false
  document.documentElement.classList.remove('mobile-menu-open')

  if (shouldRestoreMenuButtonFocus && menuButton.value?.offsetParent !== null) {
    menuButton.value?.focus()
  }

  shouldRestoreMenuButtonFocus = true
}

const handleMobileNavSelection = (sectionId: SectionId) => {
  selectSection(sectionId)
  void closeMobileMenu(false)
}

const handleDesktopViewport = (event: MediaQueryListEvent) => {
  if (event.matches) void closeMobileMenu()
}

onMounted(() => {
  supportsScrollEnd = 'onscrollend' in window
  desktopMediaQuery = window.matchMedia('(min-width: 52.001rem)')
  refreshSections()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', scheduleActiveSectionUpdate)
  desktopMediaQuery.addEventListener('change', handleDesktopViewport)

  if (supportsScrollEnd) {
    document.addEventListener('scrollend', handleScrollEnd)
  }
})

watch(
  () => route.fullPath,
  async () => {
    if (mobileMenuDialog.value?.open) void closeMobileMenu(false)

    await nextTick()
    refreshSections()
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', scheduleActiveSectionUpdate)
  desktopMediaQuery?.removeEventListener('change', handleDesktopViewport)

  if (supportsScrollEnd) {
    document.removeEventListener('scrollend', handleScrollEnd)
  }

  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
  if (navigationUnlockTimer !== undefined) window.clearTimeout(navigationUnlockTimer)
  document.documentElement.classList.remove('mobile-menu-open')

  if (mobileMenuDialog.value?.open) {
    shouldRestoreMenuButtonFocus = false
    mobileMenuDialog.value.close()
  }
})
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/" :aria-label="`${siteConfig.name}, home`">
        <span class="brand-mark" aria-hidden="true">{{ siteConfig.initials }}</span>
        <span class="brand-name">{{ siteConfig.name }}</span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <ul class="nav-list">
          <li v-for="(item, index) in navItems" :key="item.label">
            <NuxtLink
              v-if="item.sectionId"
              class="nav-link"
              :class="{ 'nav-link--active': activeSection === item.sectionId }"
              :to="{ path: '/', hash: `#${item.sectionId}` }"
              :aria-current="activeSection === item.sectionId ? 'location' : undefined"
              @click="selectSection(item.sectionId)"
            >
              <span class="nav-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ item.label }}</span>
            </NuxtLink>
            <span v-else class="nav-link nav-link--placeholder" aria-disabled="true">
              <span class="nav-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span>
                {{ item.label }}
                <span class="visually-hidden"> — coming soon</span>
              </span>
            </span>
          </li>
        </ul>
      </nav>

      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        aria-label="Open navigation"
        aria-controls="mobile-navigation"
        :aria-expanded="isMobileMenuOpen"
        @click="openMobileMenu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>
  </header>

  <Teleport to="body">
    <dialog
      id="mobile-navigation"
      ref="mobileMenuDialog"
      class="mobile-menu-dialog"
      aria-labelledby="mobile-navigation-title"
      @click.self="closeMobileMenu()"
      @close="handleMobileMenuClosed"
    >
      <div class="mobile-menu-shell">
        <div class="mobile-menu-heading">
          <p id="mobile-navigation-title">Navigation</p>
          <button
            class="mobile-menu-close"
            type="button"
            aria-label="Close navigation"
            autofocus
            @click="closeMobileMenu()"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ol class="mobile-nav-list">
            <li v-for="(item, index) in navItems" :key="item.label">
              <NuxtLink
                v-if="item.sectionId"
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link--active': activeSection === item.sectionId }"
                :to="{ path: '/', hash: `#${item.sectionId}` }"
                :aria-current="activeSection === item.sectionId ? 'location' : undefined"
                @click="handleMobileNavSelection(item.sectionId)"
              >
                <span class="mobile-nav-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span
                v-else
                class="mobile-nav-link mobile-nav-link--placeholder"
                aria-disabled="true"
              >
                <span class="mobile-nav-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>
                  {{ item.label }}
                  <span class="visually-hidden"> — coming soon</span>
                </span>
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </dialog>
  </Teleport>
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

.desktop-nav {
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.desktop-nav::-webkit-scrollbar {
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
  --nav-animation-duration: 220ms;

  position: relative;
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  color: var(--color-muted);
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
}

.nav-number {
  color: color-mix(in srgb, var(--color-muted) 48%, var(--color-bg));
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  transition: color var(--nav-animation-duration) ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0.4rem;
  left: 0;
  height: 1.5px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--nav-animation-duration) ease;
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-text);
}

.nav-link:hover::after,
.nav-link--active::after {
  transform: scaleX(1);
}

.nav-link:hover .nav-number,
.nav-link--active .nav-number {
  color: var(--color-accent);
}

.nav-link--placeholder {
  opacity: 0.52;
  cursor: default;
}

.nav-link--placeholder:hover {
  color: var(--color-muted);
}

.nav-link--placeholder:hover .nav-number {
  color: color-mix(in srgb, var(--color-muted) 48%, var(--color-bg));
}

.nav-link--placeholder::after {
  display: none;
}

.menu-toggle {
  width: 2.75rem;
  height: 2.75rem;
  display: none;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.27rem;
  padding: 0;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface) 65%, transparent);
  color: var(--color-text);
  cursor: pointer;
}

.menu-toggle > span {
  width: 1.05rem;
  height: 1px;
  background: currentColor;
}

.menu-toggle:hover {
  border-color: var(--color-muted);
}

.mobile-menu-dialog {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(28rem, 92vw);
  height: 100vh;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 0;
  border-left: 1px solid #3b4742;
  background: var(--color-text);
  color: var(--color-bg);
  box-shadow: -2rem 0 5rem rgb(0 0 0 / 26%);
}

.mobile-menu-dialog::backdrop {
  background: rgb(5 9 8 / 72%);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.mobile-menu-shell {
  min-height: 100%;
  padding: max(1.5rem, env(safe-area-inset-top)) max(1.5rem, env(safe-area-inset-right))
    max(1.5rem, env(safe-area-inset-bottom)) max(1.5rem, env(safe-area-inset-left));
}

.mobile-menu-heading {
  min-height: 4.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid #3b4742;
}

.mobile-menu-heading p {
  margin: 0;
  font-size: clamp(1.75rem, 6vw, 2.4rem);
  font-weight: 650;
  letter-spacing: -0.04em;
}

.mobile-menu-close {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #bcc8c3;
  cursor: pointer;
}

.mobile-menu-close span {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
}

.mobile-menu-close:hover {
  color: var(--color-bg);
}

.mobile-nav-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav-link {
  min-height: 5.75rem;
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #3b4742;
  color: #a9b5b0;
  font-size: clamp(1.35rem, 6vw, 1.9rem);
  font-weight: 550;
  letter-spacing: -0.035em;
  text-decoration: none;
  transition: color 160ms ease;
}

.mobile-nav-number {
  color: #708079;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: color 160ms ease;
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  color: var(--color-bg);
}

.mobile-nav-link:hover .mobile-nav-number,
.mobile-nav-link--active .mobile-nav-number {
  color: #83d7b7;
}

.mobile-nav-link--placeholder {
  opacity: 0.48;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:global(html.mobile-menu-open) {
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after,
  .nav-number,
  .mobile-nav-link,
  .mobile-nav-number {
    transition: none;
  }
}

@media (max-width: 52rem) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
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

@media (max-width: 26rem) {
  .mobile-menu-dialog {
    width: 100vw;
  }
}
</style>
