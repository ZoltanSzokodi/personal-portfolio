<script setup lang="ts">
import { siteConfig } from '#shared/data/site'

const { baseURL } = useRuntimeConfig().app

useHead({
  titleTemplate: (title) => (title ? `${title} · ${siteConfig.fullName}` : siteConfig.fullName),
  link: [{ rel: 'icon', href: `${baseURL}favicon.ico` }],
  script: [
    {
      key: 'theme-bootstrap',
      innerHTML: `(function () {
  var storageKey = 'portfolio-theme'
  var theme = 'light'
  try {
    var savedTheme = window.localStorage.getItem(storageKey)
    theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch (_) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  var root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  var themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#101714' : '#f6f7f2')
})()`,
    },
  ],
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
