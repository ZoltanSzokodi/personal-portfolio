<script setup lang="ts">
import { projects } from '#shared/data/projects'
import { siteConfig } from '#shared/data/site'

const canonicalUrl = useCanonicalUrl('/')

const skills = [
  'React Native',
  'TypeScript',
  'React',
  'Vue 3',
  'Nuxt',
  'Mobile architecture',
  'Accessibility',
  'Testing',
]

useSeoMeta({
  title: `${siteConfig.name} — React Native Software Engineer`,
  description: siteConfig.description,
  ogTitle: `${siteConfig.name} — React Native Software Engineer`,
  ogDescription: siteConfig.description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
})
</script>

<template>
  <div>
    <section class="hero section" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ siteConfig.role }}</p>
          <h1 id="hero-title">
            I build thoughtful mobile products<span>—and bring the same care to the web.</span>
          </h1>
          <p class="hero-intro">
            I’m a software engineer focused on React Native and TypeScript. I care about reliable
            architecture, accessible interfaces, and the small details that make software feel
            effortless.
          </p>

          <div class="button-row">
            <NuxtLink class="button button--primary" :to="{ path: '/', hash: '#projects' }">
              View selected project
              <span aria-hidden="true">↓</span>
            </NuxtLink>
            <NuxtLink class="button button--secondary" :to="{ path: '/', hash: '#contact' }">
              Get in touch
            </NuxtLink>
          </div>
        </div>

        <aside class="hero-aside" aria-label="Profile summary">
          <div class="status-chip"><span aria-hidden="true" /> {{ siteConfig.availability }}</div>
          <dl>
            <div>
              <dt>Focus</dt>
              <dd>Mobile products</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{{ siteConfig.location }}</dd>
            </div>
            <div>
              <dt>Exploring</dt>
              <dd>Vue 3 + Nuxt</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section id="projects" class="section section--bordered" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">01 / Selected project</p>
            <h2 id="projects-title">Projects shaped by real product constraints.</h2>
          </div>
          <p>
            A few case studies showing how I approach technical trade-offs, resilient interfaces,
            and delivery. Sample projects are clearly marked.
          </p>
        </div>

        <div class="project-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.slug"
            :project="project"
            :index="index"
          />
        </div>
      </div>
    </section>

    <section id="about" class="section section--bordered" aria-labelledby="about-title">
      <div class="container about-grid">
        <div>
          <p class="eyebrow">02 / About</p>
          <h2 id="about-title">Mobile foundations,<br />web curiosity.</h2>
        </div>

        <div class="about-copy">
          <p class="about-lead">
            I’ve spent most of my time building cross-platform mobile experiences with React Native.
            This portfolio is also a learning project: a place to translate what I know about
            components, state, performance, and UX into Vue’s ecosystem.
          </p>
          <p>
            I’m drawn to teams that value clear communication, pragmatic engineering, and products
            that respect the people using them.
          </p>

          <ul class="skill-list" aria-label="Skills and interests">
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section" aria-labelledby="contact-title">
      <div class="container contact-grid">
        <div>
          <p class="eyebrow">03 / Contact</p>
          <h2 id="contact-title">Let’s build something useful.</h2>
        </div>

        <div class="contact-copy">
          <p>
            I’m open to software engineering roles where I can contribute strong mobile experience,
            grow across the stack, and work with a thoughtful team.
          </p>

          <ul class="contact-list">
            <li v-for="contact in siteConfig.contacts" :key="contact.label">
              <a :href="contact.href">
                <span>{{ contact.label }}</span>
                <strong>{{ contact.value }}</strong>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: calc(100svh - 5rem);
  display: grid;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.hero::before {
  content: '';
  width: min(48rem, 82vw);
  height: min(48rem, 82vw);
  position: absolute;
  top: -28rem;
  right: -14rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(8 127 91 / 12%), transparent 68%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(15rem, 0.7fr);
  align-items: end;
  gap: clamp(3rem, 8vw, 8rem);
}

.hero-copy {
  max-width: 52rem;
}

h1 {
  max-width: 15ch;
  margin: 1.2rem 0 1.5rem;
  font-size: clamp(3rem, 7.8vw, 7rem);
  line-height: 0.94;
  letter-spacing: -0.075em;
}

h1 span {
  display: block;
  color: var(--color-muted);
  font-weight: 500;
}

.hero-intro {
  max-width: 39rem;
  margin: 0;
  color: var(--color-muted);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.65;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.button span {
  font-size: 1rem;
}

.hero-aside {
  padding: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 48%);
  backdrop-filter: blur(0.75rem);
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-accent-dark);
  font-size: 0.78rem;
  font-weight: 700;
}

.status-chip span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.25rem var(--color-accent-soft);
}

dl {
  margin: 0;
}

dl div {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1rem;
  padding-top: 1rem;
}

dt {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
}

dd {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 650;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.6fr);
  align-items: end;
  gap: 3rem;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.section-heading h2,
.about-grid h2,
.contact-grid h2 {
  max-width: 13ch;
  margin: 1rem 0 0;
  font-size: clamp(2.4rem, 5.8vw, 5rem);
  line-height: 1;
  letter-spacing: -0.065em;
}

.section-heading > p {
  max-width: 31rem;
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.about-grid,
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(20rem, 1.1fr);
  gap: clamp(3rem, 10vw, 10rem);
}

.about-copy,
.contact-copy {
  max-width: 43rem;
}

.about-copy p,
.contact-copy > p {
  color: var(--color-muted);
  line-height: 1.75;
}

.about-copy .about-lead {
  margin-top: 0;
  color: var(--color-text);
  font-size: clamp(1.25rem, 2.5vw, 1.65rem);
  line-height: 1.5;
  letter-spacing: -0.025em;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.skill-list li {
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.contact-section {
  background: var(--color-text);
  color: var(--color-bg);
}

.contact-section .eyebrow {
  color: #83d7b7;
}

.contact-copy > p {
  margin-top: 0;
  color: #bcc8c3;
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
}

.contact-list {
  margin: 2.5rem 0 0;
  padding: 0;
  border-top: 1px solid #3b4742;
  list-style: none;
}

.contact-list a {
  min-height: 4.5rem;
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #3b4742;
  color: var(--color-bg);
  text-decoration: none;
}

.contact-list a > span:first-child {
  color: #90a29a;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
}

.contact-list strong {
  overflow: hidden;
  font-size: 0.95rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-list a > span:last-child {
  color: #83d7b7;
}

.contact-list a:hover strong {
  color: #83d7b7;
}

@media (max-width: 60rem) {
  .hero-grid {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .hero-aside {
    max-width: 32rem;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-grid > :last-child {
    grid-column: 1 / -1;
    max-width: calc(50% - 0.75rem);
  }
}

@media (max-width: 45rem) {
  .hero {
    min-height: auto;
  }

  .section-heading,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-grid > :last-child {
    grid-column: auto;
    max-width: none;
  }
}

@media (max-width: 32rem) {
  .button-row,
  .button {
    width: 100%;
  }

  .button {
    justify-content: center;
  }

  .contact-list a {
    grid-template-columns: 1fr auto;
    gap: 0.35rem 1rem;
    padding-block: 0.85rem;
  }

  .contact-list a > span:first-child {
    grid-column: 1 / -1;
  }
}
</style>
