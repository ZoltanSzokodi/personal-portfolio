<script setup lang="ts">
import ArdPlusLogo from './SVGs/ArdPlusLogo.vue'
import BookwireLogo from './SVGs/BookwireLogo.vue'
import FlexgoldLogo from './SVGs/FlexgoldLogo.vue'
import LeonineLogo from './SVGs/LeonineLogo.vue'
import NetzkinoLogo from './SVGs/NetzkinoLogo.vue'
import SolitLogo from './SVGs/SolitLogo.vue'
</script>

<template>
  <div class="hero-clients" aria-labelledby="hero-clients-title">
    <p id="hero-clients-title" class="hero-detail-label">Shipped production apps for…</p>
    <ul aria-label="Client logos">
      <li><ArdPlusLogo class="client-logo--ardplus" /></li>
      <li><BookwireLogo class="client-logo--bookwire" /></li>
      <li><FlexgoldLogo class="client-logo--flexgold" /></li>
      <li><LeonineLogo class="client-logo--leonine" /></li>
      <li><NetzkinoLogo class="client-logo-netzkino" /></li>
      <li><SolitLogo class="client-logo--solit" /></li>
    </ul>
  </div>
</template>

<style scoped>
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
  padding: 0;
  list-style: none;
}

@media (max-width: 60rem) {
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
}
</style>
