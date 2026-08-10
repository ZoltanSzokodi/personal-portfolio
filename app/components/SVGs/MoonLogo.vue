<script setup lang="ts">
defineOptions({ name: 'MoonLogo' })

const { title = 'Moon' } = defineProps<{
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
  >
    <title v-if="title">{{ title }}</title>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
</template>
