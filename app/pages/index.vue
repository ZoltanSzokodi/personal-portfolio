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

const heroStats = [
  { value: '8+', label: 'Years of experience' },
  { value: '10+', label: 'Apps shipped' },
  { value: '4M+', label: 'Users reached' },
  { value: '250+', label: 'Production releases' },
] as const

const heroContactOrder = ['GitHub', 'LinkedIn', 'Email'] as const
const heroContacts = heroContactOrder.flatMap((label) => {
  const contact = siteConfig.contacts.find((item) => item.label === label)
  return contact ? [contact] : []
})

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
      <div class="container hero-shell">
        <div class="hero-meta">
          <p>{{ siteConfig.fullName }}</p>
          <p class="hero-meta-type"><span aria-hidden="true" /> Portfolio</p>
        </div>

        <div class="hero-grid">
          <!-- <div class="hero-copy"> -->
          <div>
            <p class="hero-kicker">Mobile architecture · Platform · Scale</p>

            <h1 id="hero-title">Web + mobile <span>engineer.</span></h1>

            <p class="hero-intro">
              I build reliable, accessible products for mobile and the web, with React Native and
              TypeScript at the core and a growing focus on Vue and Nuxt.
            </p>

            <div class="hero-stats" aria-labelledby="hero-stats-title">
              <p class="hero-detail-label">By the numbers</p>
              <dl class="hero-stats-list">
                <div v-for="stat in heroStats" :key="stat.label">
                  <dt>{{ stat.label }}</dt>
                  <dd>{{ stat.value }}</dd>
                </div>
              </dl>
            </div>

            <div class="button-row">
              <NuxtLink class="button button--primary" :to="{ path: '/', hash: '#projects' }">
                View projects
                <span aria-hidden="true">↓</span>
              </NuxtLink>
              <NuxtLink class="button button--secondary" :to="{ path: '/', hash: '#contact' }">
                Get in touch
                <span aria-hidden="true">↗</span>
              </NuxtLink>
              <button class="button button--secondary resume-button" type="button" disabled>
                <span class="resume-icon" aria-hidden="true" />
                CV / Resume
              </button>
            </div>
          </div>

          <ProfileCardPlayground />

          <ClientLogoStrip />
        </div>

        <footer class="hero-footer">
          <p class="hero-detail-label">Connect</p>
          <nav aria-label="Social links">
            <ul>
              <li v-for="contact in heroContacts" :key="contact.label">
                <a :href="contact.href">
                  {{ contact.label }}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </section>

    <section
      id="experience"
      class="section section--bordered placeholder-section"
      aria-labelledby="experience-title"
    >
      <div class="container">
        <SectionTerminalTitle index="01" command="cd ~/experience && ls" />

        <div class="section-heading">
          <h2 id="experience-title">Production work, distilled.</h2>
          <p>Selected roles, responsibilities, and measurable outcomes will be added here.</p>
        </div>
      </div>
    </section>

    <section id="projects" class="section section--bordered" aria-labelledby="projects-title">
      <div class="container">
        <SectionTerminalTitle index="02" command="cd ~/projects && ls" />

        <div class="section-heading">
          <h2 id="projects-title">Projects shaped by real product constraints.</h2>
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

    <section id="stack" class="section section--bordered" aria-labelledby="stack-title">
      <div class="container">
        <SectionTerminalTitle index="03" command="cat ~/stack.txt" />

        <h2 id="stack-title">Tools I build with.</h2>
        <p>A concise overview for now. More context about how I use each tool will follow.</p>

        <ul class="skill-list" aria-label="Skills and interests">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </section>

    <section id="whoami" class="section section--bordered" aria-labelledby="whoami-title">
      <div class="container">
        <SectionTerminalTitle index="04" command="whoami" />

        <div class="whoami-grid">
          <div>
            <p class="eyebrow">whoami</p>
            <h2 id="whoami-title">Mobile foundations,<br />web curiosity.</h2>
          </div>

          <div class="whoami-copy">
            <p class="whoami-lead">
              I’ve spent most of my time building cross-platform mobile experiences with React
              Native. This portfolio is also a learning project: a place to translate what I know
              whoami components, state, performance, and UX into Vue’s ecosystem.
            </p>
            <p>
              I’m drawn to teams that value clear communication, pragmatic engineering, and products
              that respect the people using them.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section" aria-labelledby="contact-title">
      <div class="container">
        <SectionTerminalTitle index="05" command="open ~/contact" inverse />

        <div class="contact-grid">
          <h2 id="contact-title">Let’s build something useful.</h2>

          <div class="contact-copy">
            <p>
              I’m open to software engineering roles where I can contribute strong mobile
              experience, grow across the stack, and work with a thoughtful team.
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
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/breakpoints' as bp;

.hero {
  --hero-section-space: clamp(2rem, 4vw, 3rem);

  min-height: calc(100svh - 4rem);
  position: relative;
  display: grid;
  overflow: hidden;
  padding: 0;
}

.hero-shell {
  min-height: inherit;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

/* .hero::before {
  content: '';
  width: min(52rem, 85vw);
  height: min(52rem, 85vw);
  position: absolute;
  top: -32rem;
  right: -18rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(8 127 91 / 14%), transparent 68%);
  pointer-events: none;
} */

/* .hero-shell {
  min-height: calc(100svh - 4rem - var(--hero-top-space));
  display: grid;
  grid-template-rows: auto 1fr auto;
} */

.hero-meta {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 2rem; */
  padding-bottom: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-meta p {
  margin: 0;
}

.hero-meta-type {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent-dark);
  font-size: 0.75rem;
}

.hero-meta-type span {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-accent);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(22rem, 5fr);
  align-items: center;
  column-gap: clamp(2rem, 5vw, 6rem);
  row-gap: 0;
  padding-block: 0;
}

/* .hero-copy {
  max-width: 48rem;
} */

.hero-kicker {
  margin: 0;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.15em;
  line-height: 1.5;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  margin: 1.25rem 0 1.5rem;
  font-size: clamp(3.25rem, 7.2vw, 6.5rem);
  line-height: 0.9;
  letter-spacing: -0.07em;
  text-transform: uppercase;
}

h1 span {
  /* display: block; */
  color: var(--color-accent);
}

.hero-intro {
  max-width: 38rem;
  /* margin: 0; */
  color: var(--color-muted);
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  line-height: 1.5;
}

.hero-detail-label {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-detail-label::before {
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  flex: 0 0 0.4rem;
  border-radius: 50%;
  color: var(--color-accent);
  background: var(--color-accent);
}

.hero-stats {
  margin-top: var(--hero-section-space);
}

.hero-stats-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 2.5rem);
  margin: 1rem 0 0;
}

.hero-stats-list > div {
  min-width: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.45rem;
  padding-left: 1rem;
  border-left: 2px solid var(--color-accent-soft);
}

.hero-stats-list dt {
  color: var(--color-muted);
  font-size: 0.74rem;
}

.hero-stats-list dd {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  font-weight: 650;
  letter-spacing: -0.045em;
  line-height: 1;
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

.resume-button {
  justify-content: flex-start;
  background: transparent;
  cursor: not-allowed;
  opacity: 0.56;
}

.resume-button:disabled:hover {
  background: transparent;
  transform: none;
}

.resume-icon {
  width: 0.9rem;
  height: 1.1rem;
  position: relative;
  flex: 0 0 auto;
  border: 1.5px solid currentColor;
  border-radius: 0.15rem;
}

.resume-icon::before,
.resume-icon::after {
  content: '';
  position: absolute;
  right: 0.18rem;
  left: 0.18rem;
  height: 1px;
  background: currentColor;
}

.resume-icon::before {
  bottom: 0.42rem;
}

.resume-icon::after {
  bottom: 0.2rem;
}

.hero-footer {
  height: 2rem;
  min-height: 0;
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
}

.hero-footer ul {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 2rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

.hero-footer a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 650;
  text-decoration: none;
  transition: color 160ms ease;
}

.hero-footer a span {
  color: var(--color-accent);
}

.hero-footer a:hover {
  color: var(--color-text);
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.6fr);
  align-items: end;
  gap: 3rem;
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.placeholder-section .section-heading {
  margin-bottom: 0;
}

.section-heading h2,
.whoami-grid h2,
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

.whoami-grid,
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(20rem, 1.1fr);
  gap: clamp(3rem, 10vw, 10rem);
}

.whoami-copy,
.contact-copy {
  max-width: 43rem;
}

.whoami-copy p,
.contact-copy > p {
  color: var(--color-muted);
  line-height: 1.75;
}

.whoami-copy .whoami-lead {
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
  background: var(--color-inverse-bg);
  color: var(--color-inverse-text);
}

.contact-copy > p {
  margin-top: 0;
  color: var(--color-inverse-muted);
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
}

.contact-list {
  margin: 2.5rem 0 0;
  padding: 0;
  border-top: 1px solid var(--color-inverse-line);
  list-style: none;
}

.contact-list a {
  min-height: 4.5rem;
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-inverse-line);
  color: var(--color-inverse-text);
  text-decoration: none;
}

.contact-list a > span:first-child {
  color: var(--color-inverse-faint);
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
  color: var(--color-terminal-accent);
}

.contact-list a:hover strong {
  color: var(--color-terminal-accent);
}

@include bp.tablet-and-down {
  .hero-meta {
    min-height: 4.25rem;
  }

  .hero-meta > p:first-child {
    visibility: hidden;
  }

  .hero-meta-type {
    margin-left: auto;
  }

  .hero {
    min-height: auto;
  }

  .hero-shell {
    min-height: 0;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    align-items: start;
    column-gap: 0;
    row-gap: var(--hero-section-space);
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-grid > :last-child {
    grid-column: 1 / -1;
    max-width: calc(50% - 0.75rem);
  }
}

@include bp.mobile-and-down {
  .hero-stats-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-footer {
    height: auto;
    min-height: 2rem;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    padding-block: 1.25rem;
  }

  .section-heading,
  .whoami-grid,
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

@include bp.compact-and-down {
  .hero-stats-list {
    grid-template-columns: 1fr;
  }

  .hero-stats-list > div {
    min-height: 3.6rem;
  }

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
