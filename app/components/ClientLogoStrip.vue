<script setup lang="ts">
import ArdPlusLogo from './SVGs/ArdPlusLogo.vue'
import BookwireLogo from './SVGs/BookwireLogo.vue'
import FlexgoldLogo from './SVGs/FlexgoldLogo.vue'
import LeonineLogo from './SVGs/LeonineLogo.vue'
import NetzkinoLogo from './SVGs/NetzkinoLogo.vue'
import SolitLogo from './SVGs/SolitLogo.vue'

const { theme } = useTheme()
</script>

<template>
  <div
    class="hero-clients"
    :class="{ 'hero-clients--dark': theme === 'dark' }"
    aria-labelledby="hero-clients-title"
  >
    <p id="hero-clients-title" class="hero-detail-label">Shipped production apps for…</p>
    <ul aria-label="Client logos">
      <li>
        <a
          href="https://www.ardplus.de/"
          aria-label="Visit ARD Plus"
          target="_blank"
          rel="noopener noreferrer"
          ><ArdPlusLogo class="client-logo--ardplus"
        /></a>
      </li>
      <li>
        <a
          href="https://www.bookwire.net/"
          aria-label="Visit Bookwire"
          target="_blank"
          rel="noopener noreferrer"
          ><BookwireLogo class="client-logo--bookwire"
        /></a>
      </li>
      <li>
        <a
          href="https://flexgold.com/"
          aria-label="Visit Flexgold"
          target="_blank"
          rel="noopener noreferrer"
          ><FlexgoldLogo class="client-logo--flexgold"
        /></a>
      </li>
      <li>
        <a
          href="https://www.leoninestudios.com/"
          aria-label="Visit Leonine Studios"
          target="_blank"
          rel="noopener noreferrer"
          ><LeonineLogo class="client-logo--leonine"
        /></a>
      </li>
      <li>
        <a
          href="https://www.netzkino.de/"
          aria-label="Visit Netzkino"
          target="_blank"
          rel="noopener noreferrer"
          ><NetzkinoLogo class="client-logo-netzkino"
        /></a>
      </li>
      <li>
        <a
          href="https://www.solit-kapital.de/"
          aria-label="Visit Solit"
          target="_blank"
          rel="noopener noreferrer"
          ><SolitLogo class="client-logo--solit"
        /></a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hero-detail-label {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.hero-clients {
  width: 100%;
  grid-column: 1 / -1;
  margin-top: var(--hero-section-space, clamp(2rem, 4vw, 3rem));
  padding-top: 0;
}

.hero-clients ul {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: center;
  gap: 4rem;
  padding: 0;
  list-style: none;
}

.hero-clients li > a {
  display: flex;
  justify-content: center;
  color: inherit;
  line-height: 0;
  text-decoration: none;
}

.hero-clients li > a > svg {
  transition: filter 160ms ease;
}

/* Native brand colors in light mode; grayscale only this strip's SVGs in dark mode. */
.hero-clients--dark li > a > svg {
  filter: brightness(0) invert(0.62);
}

.hero-clients--dark li > a:hover > svg,
.hero-clients--dark li > a:focus-visible > svg {
  filter: brightness(0) invert(0.92);
}

@media (max-width: 60rem) {
  .hero-clients {
    margin-top: 0;
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

  .hero-clients li > a {
    max-width: 100%;
  }

  .hero-clients li > a > svg {
    display: block;
    width: auto;
    max-width: 100%;
    height: clamp(1.25rem, 3.5vw, 1.75rem);
  }

  .hero-clients li > a > .client-logo--leonine {
    height: clamp(2rem, 5vw, 2.5rem);
  }

  .hero-clients li > a > .client-logo--solit {
    height: clamp(3rem, 10vw, 5rem);
  }
}
</style>
