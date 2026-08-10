<script setup lang="ts">
import type { ProjectVisual } from '#shared/types/project'

defineProps<{
  variant: ProjectVisual
  alt: string
}>()
</script>

<template>
  <div class="project-visual" :class="`project-visual--${variant}`" role="img" :aria-label="alt">
    <div v-if="variant === 'fieldkit'" class="device device--fieldkit" aria-hidden="true">
      <span class="device-notch" />
      <div class="screen-head">
        <span class="screen-kicker">Report 042</span>
        <span class="sync-dot" />
      </div>
      <span class="screen-title" />
      <span class="screen-line screen-line--wide" />
      <span class="screen-line" />
      <div class="screen-card">
        <span class="screen-icon">↗</span>
        <span class="screen-line screen-line--short" />
      </div>
      <span class="screen-button">Queued offline</span>
    </div>

    <div v-else-if="variant === 'gather'" class="device device--gather" aria-hidden="true">
      <div class="search-row">
        <span class="search-icon" />
        <span class="screen-line screen-line--short" />
      </div>
      <div class="filter-row"><span>Today</span><span>Nearby</span><span>Music</span></div>
      <div class="event-card event-card--primary">
        <span class="event-date">18</span>
        <span class="event-copy"><i /><i /></span>
      </div>
      <div class="event-card">
        <span class="event-date">24</span>
        <span class="event-copy"><i /><i /></span>
      </div>
    </div>

    <div v-else class="browser" aria-hidden="true">
      <div class="browser-bar"><span /><span /><span /></div>
      <div class="browser-body">
        <div class="browser-nav"><i /><i /><i /></div>
        <span class="browser-eyebrow" />
        <span class="browser-title browser-title--wide" />
        <span class="browser-title" />
        <div class="browser-grid"><i /><i /><i /></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.project-visual {
  min-height: 18rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius-lg);
  position: relative;
  isolation: isolate;
}

.project-visual::before,
.project-visual::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  z-index: -1;
}

.project-visual::before {
  width: 16rem;
  height: 16rem;
  top: -7rem;
  right: -4rem;
  background: rgb(255 255 255 / 28%);
}

.project-visual::after {
  width: 10rem;
  height: 10rem;
  bottom: -5rem;
  left: -2rem;
  border: 1px solid rgb(255 255 255 / 45%);
}

.project-visual--fieldkit {
  background: #d9eee4;
}

.project-visual--gather {
  background: #f2e2d4;
}

.project-visual--portfolio {
  background: #dfe7f0;
}

.device {
  width: 11rem;
  min-height: 14rem;
  padding: 1.1rem 0.9rem 0.85rem;
  border: 5px solid var(--color-text);
  border-radius: 1.65rem;
  background: #fbfcf9;
  box-shadow: 0 1.5rem 3rem rgb(23 32 29 / 18%);
  transform: rotate(3deg);
}

.device--gather {
  width: 13rem;
  transform: rotate(-2deg);
}

.device-notch {
  width: 2.6rem;
  height: 0.32rem;
  display: block;
  margin: -0.45rem auto 1rem;
  border-radius: 999px;
  background: var(--color-text);
}

.screen-head,
.search-row,
.filter-row,
.event-card,
.screen-card {
  display: flex;
  align-items: center;
}

.screen-head {
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.screen-kicker,
.screen-button,
.filter-row span,
.event-date {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
}

.sync-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.22rem var(--color-accent-soft);
}

.screen-title,
.screen-line,
.event-copy i,
.browser-title,
.browser-eyebrow {
  display: block;
  border-radius: 999px;
  background: #c7d1cc;
}

.screen-title {
  width: 65%;
  height: 0.65rem;
  margin-bottom: 0.65rem;
  background: var(--color-text);
}

.screen-line {
  width: 55%;
  height: 0.28rem;
  margin-block: 0.35rem;
}

.screen-line--wide {
  width: 88%;
}

.screen-line--short {
  width: 45%;
}

.screen-card {
  gap: 0.6rem;
  margin-block: 1rem;
  padding: 0.65rem;
  border-radius: 0.65rem;
  background: #e6ede9;
}

.screen-icon {
  width: 1.4rem;
  height: 1.4rem;
  display: grid;
  place-items: center;
  border-radius: 0.4rem;
  background: var(--color-accent);
  color: white;
  font-size: 0.7rem;
}

.screen-button {
  display: block;
  padding: 0.6rem;
  border-radius: 0.55rem;
  background: var(--color-text);
  color: white;
  text-align: center;
  text-transform: none;
}

.search-row {
  gap: 0.55rem;
  padding: 0.6rem;
  border: 1px solid #d8d2cc;
  border-radius: 0.75rem;
}

.search-icon {
  width: 0.6rem;
  height: 0.6rem;
  border: 1.5px solid var(--color-text);
  border-radius: 50%;
}

.filter-row {
  gap: 0.3rem;
  margin-block: 0.75rem;
}

.filter-row span {
  padding: 0.3rem 0.45rem;
  border-radius: 999px;
  background: #eee8e2;
  font-size: 0.42rem;
  text-transform: none;
}

.event-card {
  gap: 0.7rem;
  margin-top: 0.55rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #eee8e2;
}

.event-card--primary {
  background: #2e3935;
  color: white;
}

.event-date {
  width: 1.85rem;
  height: 1.85rem;
  display: grid;
  flex: none;
  place-items: center;
  border-radius: 0.55rem;
  background: rgb(255 255 255 / 75%);
  color: var(--color-text);
}

.event-copy {
  flex: 1;
}

.event-copy i {
  width: 80%;
  height: 0.3rem;
  margin-block: 0.3rem;
  background: currentColor;
  opacity: 0.45;
}

.event-copy i:last-child {
  width: 55%;
}

.browser {
  width: min(82%, 23rem);
  border: 4px solid var(--color-text);
  border-radius: 1rem;
  overflow: hidden;
  background: #fbfcf9;
  box-shadow: 0 1.5rem 3rem rgb(23 32 29 / 16%);
  transform: rotate(1.5deg);
}

.browser-bar {
  display: flex;
  gap: 0.3rem;
  padding: 0.65rem;
  border-bottom: 2px solid var(--color-text);
}

.browser-bar span {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #9aa9a2;
}

.browser-body {
  min-height: 10rem;
  padding: 0.8rem 1rem 1rem;
}

.browser-nav {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.browser-nav i {
  width: 1.35rem;
  height: 0.22rem;
  border-radius: 999px;
  background: #9aa9a2;
}

.browser-eyebrow {
  width: 3rem;
  height: 0.25rem;
  margin-bottom: 0.65rem;
  background: var(--color-accent);
}

.browser-title {
  width: 55%;
  height: 0.6rem;
  margin-block: 0.35rem;
  background: var(--color-text);
}

.browser-title--wide {
  width: 78%;
}

.browser-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
  margin-top: 1.25rem;
}

.browser-grid i {
  height: 3.2rem;
  border-radius: 0.5rem;
  background: #dbe4df;
}

@include bp.mobile-and-down {
  .project-visual {
    min-height: 15rem;
  }

  .device {
    transform: scale(0.9) rotate(3deg);
  }

  .device--gather {
    transform: scale(0.9) rotate(-2deg);
  }
}
</style>
