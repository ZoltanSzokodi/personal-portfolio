<script setup lang="ts">
import { siteConfig } from '#shared/data/site'
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
          <li><NuxtLink :to="{ path: '/', hash: '#work' }">Work</NuxtLink></li>
          <li><NuxtLink :to="{ path: '/', hash: '#about' }">About</NuxtLink></li>
          <li><NuxtLink :to="{ path: '/', hash: '#contact' }">Contact</NuxtLink></li>
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
  min-height: 5rem;
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

.nav-list a {
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  color: var(--color-muted);
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
}

.nav-list a:hover {
  color: var(--color-text);
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
