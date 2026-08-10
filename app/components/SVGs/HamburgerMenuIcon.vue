<script setup lang="ts">
defineOptions({ name: 'HamburgerMenuIcon' })

const { title = 'Menu' } = defineProps<{
  title?: string
}>()
</script>

<template>
  <svg
    :role="title ? 'img' : undefined"
    :aria-label="title"
    :aria-hidden="title ? undefined : 'true'"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <title v-if="title">{{ title }}</title>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
</template>
