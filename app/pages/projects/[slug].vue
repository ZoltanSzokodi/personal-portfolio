<script setup lang="ts">
import { findProject, projects } from '#shared/data/projects'
import { siteConfig } from '#shared/data/site'
import type { Project } from '#shared/types/project'

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const project = computed((): Project => {
  const match = findProject(slug.value || '')
  if (!match) throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  return match
})

const nextProject = computed(() => {
  const index = projects.findIndex((item) => item.slug === project.value.slug)
  return projects[(index + 1) % projects.length] ?? project.value
})

const canonicalUrl = useCanonicalUrl(computed(() => route.path))

useSeoMeta({
  title: () => project.value.title,
  description: () => project.value.summary,
  ogTitle: () => `${project.value.title} · ${siteConfig.name}`,
  ogDescription: () => project.value.summary,
  ogType: 'article',
  ogUrl: canonicalUrl,
  twitterCard: 'summary',
})

useHead({ link: [{ rel: 'canonical', href: canonicalUrl }] })
</script>

<template>
  <article>
    <header class="project-hero section">
      <div class="container">
        <NuxtLink class="back-link" to="/#projects"
          ><span aria-hidden="true">←</span> All projects</NuxtLink
        >

        <div class="project-heading">
          <div>
            <p class="eyebrow">{{ project.label }}</p>
            <h1>{{ project.title }}</h1>
            <p class="project-summary">{{ project.summary }}</p>
          </div>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{{ project.timeline }}</dd>
            </div>
          </dl>
        </div>

        <ProjectVisual :variant="project.visual" :alt="project.visualAlt" />
      </div>
    </header>

    <div class="section section--bordered">
      <div class="container content-grid">
        <aside>
          <p class="eyebrow">Stack</p>
          <ul class="tag-list">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
        </aside>

        <div class="case-study">
          <section>
            <p class="section-number">01</p>
            <h2>The challenge</h2>
            <p class="lead">{{ project.challenge }}</p>
          </section>
          <section>
            <p class="section-number">02</p>
            <h2>The approach</h2>
            <ol>
              <li v-for="item in project.approach" :key="item">{{ item }}</li>
            </ol>
          </section>
          <section>
            <p class="section-number">03</p>
            <h2>Outcome & learnings</h2>
            <p class="lead">{{ project.outcome }}</p>
            <ul class="learnings">
              <li v-for="learning in project.learnings" :key="learning">{{ learning }}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <footer class="next-project">
      <div class="container">
        <p class="eyebrow">Next project</p>
        <NuxtLink :to="`/projects/${nextProject.slug}`">
          {{ nextProject.title }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </footer>
  </article>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.project-hero {
  padding-top: clamp(2.5rem, 6vw, 5rem);
}
.back-link {
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: clamp(3rem, 8vw, 6rem);
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}
.project-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(15rem, 0.5fr);
  align-items: end;
  gap: 3rem;
  margin-bottom: clamp(3rem, 7vw, 5rem);
}
h1 {
  margin: 1rem 0;
  font-size: clamp(3.5rem, 9vw, 8rem);
  line-height: 0.9;
  letter-spacing: -0.075em;
}
.project-summary {
  max-width: 43rem;
  margin: 0;
  color: var(--color-muted);
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
  line-height: 1.6;
}
dl {
  margin: 0;
  border-top: 1px solid var(--color-line);
}
dl div {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--color-line);
}
dt {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
}
dd {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
}
.project-hero :deep(.project-visual) {
  min-height: clamp(22rem, 52vw, 38rem);
}
.content-grid {
  display: grid;
  grid-template-columns: minmax(10rem, 0.45fr) minmax(0, 1.2fr);
  gap: clamp(3rem, 10vw, 10rem);
}
aside {
  align-self: start;
  position: sticky;
  top: 2rem;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}
.tag-list li {
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}
.case-study {
  max-width: 48rem;
}
.case-study section + section {
  margin-top: clamp(4rem, 9vw, 7rem);
  padding-top: clamp(4rem, 9vw, 7rem);
  border-top: 1px solid var(--color-line);
}
.section-number {
  margin: 0 0 1rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}
h2 {
  margin: 0 0 1.5rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1;
  letter-spacing: -0.06em;
}
.lead {
  margin: 0;
  font-size: clamp(1.2rem, 2.4vw, 1.55rem);
  line-height: 1.6;
  letter-spacing: -0.02em;
}
.case-study ol {
  margin: 0;
  padding-left: 1.5rem;
}
.case-study ol li {
  padding: 1rem 0 1rem 0.5rem;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-muted);
  line-height: 1.7;
}
.learnings {
  margin: 2rem 0 0;
  padding-left: 1.25rem;
  color: var(--color-muted);
  line-height: 1.7;
}
.next-project {
  padding-block: clamp(4rem, 9vw, 7rem);
  border-top: 1px solid var(--color-line);
}
.next-project a {
  min-height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  color: var(--color-text);
  font-size: clamp(2.4rem, 7vw, 6rem);
  font-weight: 750;
  line-height: 1;
  letter-spacing: -0.06em;
  text-decoration: none;
}
.next-project a span {
  color: var(--color-accent);
  font-size: 0.65em;
}
@include bp.mobile-and-down {
  .project-heading,
  .content-grid {
    grid-template-columns: 1fr;
  }
  aside {
    position: static;
  }
}
</style>
