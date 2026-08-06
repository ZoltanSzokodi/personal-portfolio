<script setup lang="ts">
import type { Project } from '#shared/types/project'

defineProps<{
  project: Project
  index: number
}>()
</script>

<template>
  <article class="project-card">
    <ProjectVisual :variant="project.visual" :alt="project.visualAlt" />

    <div class="project-card__body">
      <div class="project-card__meta">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <span>{{ project.label }}</span>
      </div>

      <h3>
        <NuxtLink :to="`/projects/${project.slug}`">
          {{ project.title }}
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </h3>

      <p>{{ project.summary }}</p>

      <ul class="tag-list" :aria-label="`${project.title} technologies`">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  min-width: 0;
  position: relative;
}

.project-card__body {
  padding: 1.35rem 0.2rem 0;
}

.project-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  letter-spacing: -0.04em;
}

h3 a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text);
  text-decoration: none;
}

h3 a::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
}

h3 span {
  color: var(--color-accent);
  font-size: 1.1rem;
  transition: transform 180ms ease;
}

.project-card:hover h3 span {
  transform: translate(0.15rem, -0.15rem);
}

p {
  margin: 0.75rem 0 1rem;
  color: var(--color-muted);
  line-height: 1.65;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag-list li {
  padding: 0.38rem 0.6rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

@media (prefers-reduced-motion: reduce) {
  h3 span {
    transition: none;
  }
}
</style>
