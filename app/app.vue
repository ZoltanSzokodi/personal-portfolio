<script setup lang="ts">
import { siteConfig } from '#shared/data/site'

const { baseURL } = useRuntimeConfig().app

useHead({
  titleTemplate: (title) => (title ? `${title} · ${siteConfig.name}` : siteConfig.name),
  link: [{ rel: 'icon', href: `${baseURL}favicon.ico` }],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
