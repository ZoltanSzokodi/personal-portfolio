<script setup lang="ts">
defineProps<{
  index: string
  command: string
  inverse?: boolean
}>()
</script>

<template>
  <p
    class="section-terminal-title"
    :class="{ 'section-terminal-title--inverse': inverse }"
    :aria-label="`Section ${index}: ${command}`"
  >
    <span class="section-terminal-title__prompt" aria-hidden="true">[{{ index }}] $</span>
    <span class="section-terminal-title__command" aria-hidden="true">{{ command }}</span>
  </p>
</template>

<style scoped>
.section-terminal-title {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin: 0 0 clamp(2rem, 5vw, 3.5rem);
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 1.4vw, 0.95rem);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.section-terminal-title__prompt {
  color: var(--color-muted);
}

.section-terminal-title__command {
  color: var(--color-accent-dark);
}

.section-terminal-title--inverse .section-terminal-title__prompt {
  color: #708079;
}

.section-terminal-title--inverse .section-terminal-title__command {
  color: #83d7b7;
}
</style>
