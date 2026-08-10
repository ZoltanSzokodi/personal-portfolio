<script setup lang="ts">
const isMoonIcon = ref(false)

const toggleThemeIcon = () => {
  isMoonIcon.value = !isMoonIcon.value
}
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    aria-label="Toggle theme icon"
    title="Theme"
    :aria-pressed="isMoonIcon"
    @click="toggleThemeIcon"
  >
    <span
      class="theme-toggle-icon"
      :class="{ 'theme-toggle-icon--moon': isMoonIcon }"
      aria-hidden="true"
    >
      <SVGsSunLogo class="theme-toggle-icon__sun" title="" />
      <SVGsMoonLogo class="theme-toggle-icon__moon" title="" />
    </span>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  padding: 0;
  border: 1px solid var(--color-line);
  border-radius: 0.8rem;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 160ms ease;
}

.theme-toggle:hover {
  background: color-mix(in srgb, var(--color-muted) 10%, var(--color-surface));
}

.theme-toggle-icon {
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  display: block;
}

.theme-toggle-icon > svg {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  transition:
    opacity 300ms ease,
    transform 300ms ease;
}

.theme-toggle-icon__sun {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.theme-toggle-icon__moon {
  opacity: 0;
  transform: scale(0.7) rotate(270deg);
}

.theme-toggle-icon--moon .theme-toggle-icon__sun {
  opacity: 0;
  transform: scale(0.7) rotate(-270deg);
}

.theme-toggle-icon--moon .theme-toggle-icon__moon {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle {
    transition: none;
  }

  .theme-toggle-icon > svg {
    transition: none;
  }
}
</style>
