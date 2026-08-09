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
      <!-- <div class="container hero-shell"> -->
      <div class="container hero">
        <div class="hero-meta">
          <p>{{ siteConfig.name }}</p>
          <p class="hero-meta-type"><span aria-hidden="true" /> Portfolio</p>
        </div>

        <div class="hero-grid">
          <!-- <div class="hero-copy"> -->
          <div>
            <p class="availability-chip">
              <span class="availability-dot" aria-hidden="true" />
              {{ siteConfig.availability }}
            </p>

            <p class="hero-kicker">Mobile architecture · Platform · Scale</p>

            <h1 id="hero-title">Web + mobile <span>engineer.</span></h1>

            <p class="hero-intro">
              I build reliable, accessible products for mobile and the web, with React Native and
              TypeScript at the core and a growing focus on Vue and Nuxt.
            </p>

            <div class="hero-stats" aria-labelledby="hero-stats-title">
              <p id="hero-stats-title" class="hero-detail-label">By the numbers</p>
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

          <figure class="profile-card">
            <div
              class="profile-image-placeholder"
              role="img"
              :aria-label="`Portrait placeholder for ${siteConfig.name}`"
            >
              <span aria-hidden="true">{{ siteConfig.initials }}</span>
              <small aria-hidden="true">Portrait placeholder</small>
            </div>
            <figcaption>
              <div class="profile-identity">
                <strong>{{ siteConfig.name }}</strong>
                <span>{{ siteConfig.location }}</span>
              </div>
              <p><span aria-hidden="true" /> {{ siteConfig.role }}</p>
            </figcaption>
          </figure>

          <div class="hero-clients" aria-labelledby="hero-clients-title">
            <p id="hero-clients-title" class="hero-detail-label">Shipped production apps for…</p>
            <ul aria-label="Client logos">
              <li><ArdPlusLogo class="client-logo--ardplus" title="ARD Plus" /></li>
              <li><BookwireLogo class="client-logo--bookwire" title="Bookwire" /></li>
              <li><FlexgoldLogo class="client-logo--flexgold" title="Flexgold" /></li>
              <li><LeonineLogo class="client-logo--leonine" title="Leonine Studios" /></li>
              <li><NetzkinoLogo class="client-logo-netzkino" title="Netzkino" /></li>
              <li><SolitLogo class="client-logo--solit" title="Solit" /></li>
            </ul>
          </div>
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
  --hero-top-space: clamp(1.25rem, 2.5vh, 2rem);
  min-height: calc(100svh - 4rem);
  display: grid;
  /* position: relative; */
  overflow: hidden;
  padding-block: var(--hero-top-space) 0;
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
  /* align-items: flex-start; */
  justify-content: space-between;
  /* gap: 2rem; */
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* .hero-meta p {
  margin: 0;
} */

.hero-meta-type {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent-dark);
}

.hero-meta-type span {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  /* background: var(--color-accent); */
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(17rem, 0.55fr);
  align-items: center;
  column-gap: clamp(3rem, 9vw, 8.5rem);
  row-gap: 0;
  padding-block: clamp(1.5rem, 3vh, 3rem);
}

/* .hero-copy {
  max-width: 48rem;
} */

.availability-chip {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--color-accent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-accent-soft) 50%, transparent);
  color: var(--color-accent-dark);
  font-size: 0.7rem;
  font-weight: bold;
}

.hero-kicker {
  margin: clamp(1.25rem, 2.5vh, 2rem) 0 0;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.15em;
  line-height: 1.5;
  text-transform: uppercase;
}

.availability-dot {
  width: 0.5rem;
  height: 0.5rem;
  position: relative;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.22rem var(--color-accent-soft);
}

.availability-dot::after {
  content: '';
  position: absolute;
  inset: -0.25rem;
  border: 1px solid var(--color-accent);
  border-radius: inherit;
  animation: availability-pulse 2s ease-out infinite;
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
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-detail-label::before {
  content: '•';
  margin-right: 0.55rem;
  color: var(--color-accent);
}

.hero-stats {
  margin-top: clamp(2rem, 4vw, 3rem);
}

.hero-stats-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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

.hero-clients {
  width: 100%;
  grid-column: 1 / -1;
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-line);
}

.hero-clients ul {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: center;
  gap: 4rem;
  /* margin: 1.1rem 0 0; */
  padding: 0;
  list-style: none;
}

.client-logo--ardplus {
}
.client-logo--bookwire {
}
.client-logo--flexgold {
}
.client-logo--leonine {
}
.client-logo--netzkino {
}
.client-logo--solit {
  /* height: 4rem; */
}

.profile-card {
  width: min(100%, 22rem);
  justify-self: end;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 82%, transparent);
  box-shadow: 0 1.5rem 4rem rgb(23 32 29 / 10%);
}

.profile-image-placeholder {
  aspect-ratio: 4 / 5;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 24% 24%, rgb(255 255 255 / 86%), transparent 22%),
    linear-gradient(145deg, var(--color-accent-soft), #a8d9c7 58%, var(--color-accent));
}

.profile-image-placeholder::before,
.profile-image-placeholder::after {
  content: '';
  position: absolute;
  border: 1px solid rgb(255 255 255 / 38%);
  border-radius: 50%;
}

.profile-image-placeholder::before {
  width: 18rem;
  height: 18rem;
  top: -6rem;
  right: -9rem;
}

.profile-image-placeholder::after {
  width: 12rem;
  height: 12rem;
  bottom: -5rem;
  left: -4rem;
}

.profile-image-placeholder > span {
  position: relative;
  z-index: 1;
  color: color-mix(in srgb, var(--color-text) 82%, transparent);
  font-family: var(--font-mono);
  font-size: clamp(3.5rem, 7vw, 5.5rem);
  font-weight: 750;
  letter-spacing: -0.08em;
}

.profile-image-placeholder small {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  z-index: 1;
  color: color-mix(in srgb, var(--color-text) 64%, transparent);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
}

.profile-card figcaption {
  padding: 1.15rem 1.25rem 1.25rem;
}

.profile-identity {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.profile-identity strong {
  font-size: 1rem;
}

.profile-identity span {
  color: var(--color-muted);
  font-size: 0.72rem;
  text-align: right;
}

.profile-card figcaption p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding-top: 0.65rem;
  color: var(--color-muted);
  font-size: 0.78rem;
}

.profile-card figcaption p span {
  width: 0.4rem;
  height: 0.4rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--color-accent);
}

.hero-footer {
  min-height: 4.75rem;
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  border-top: 1px solid var(--color-line);
}

.hero-footer .hero-detail-label::before {
  content: none;
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

@keyframes availability-pulse {
  0% {
    opacity: 0.5;
    transform: scale(0.75);
    background-color: var(--color-accent);
  }
  50% {
    opacity: 0.25;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.25);
  }
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
  .hero {
    min-height: auto;
  }

  .hero-shell {
    min-height: 0;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 3.5rem;
  }

  .hero-clients ul {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem clamp(2.5rem, 7vw, 4rem);
  }

  .hero-clients li {
    display: grid;
    min-width: 0;
    place-items: center;
  }

  .hero-clients li > svg {
    display: block;
    width: auto;
    max-width: 100%;
    height: clamp(1.25rem, 3.5vw, 1.75rem);
  }

  .hero-clients li > .client-logo--leonine {
    height: clamp(2rem, 5vw, 2.5rem);
  }

  .hero-clients li > .client-logo--solit {
    height: clamp(3rem, 10vw, 5rem);
  }

  .profile-card {
    width: min(100%, 28rem);
    justify-self: start;
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
  .hero-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    padding-block: 1.25rem;
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
