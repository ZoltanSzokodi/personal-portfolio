<script setup lang="ts">
import { siteConfig } from '#shared/data/site'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© {{ currentYear }} {{ siteConfig.name }}</p>
      <p>Built with Nuxt, Vue, TypeScript, and plain CSS.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: 2rem;
  border-top: 1px solid var(--color-line);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  color: var(--color-muted);
  font-size: 0.82rem;
}

.footer-inner p {
  margin: 0;
}

@media (max-width: 42rem) {
  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
