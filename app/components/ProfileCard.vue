<script setup lang="ts">
import { siteConfig } from '#shared/data/site'

const isProfileImageAvailable = ref(false)

onMounted(() => {
  const profileImage = new Image()

  profileImage.addEventListener(
    'load',
    () => {
      isProfileImageAvailable.value = true
    },
    { once: true },
  )

  profileImage.src = siteConfig.profileImage
})
</script>

<template>
  <figure class="profile-card">
    <div
      class="profile-image-placeholder"
      :role="isProfileImageAvailable ? undefined : 'img'"
      :aria-label="
        isProfileImageAvailable ? undefined : `Portrait placeholder for ${siteConfig.name}`
      "
    >
      <img
        v-if="isProfileImageAvailable"
        :src="siteConfig.profileImage"
        :alt="`Portrait of ${siteConfig.fullName}`"
        draggable="false"
        @error="isProfileImageAvailable = false"
      />
      <template v-else>
        <span aria-hidden="true">{{ siteConfig.initials }}</span>
        <small aria-hidden="true">Portrait placeholder</small>
      </template>
    </div>
    <figcaption>
      <div class="profile-identity">
        <strong>{{ siteConfig.fullName }}</strong>
        <span>{{ siteConfig.location }}</span>
      </div>
      <p><span aria-hidden="true" /> {{ siteConfig.role }}</p>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.profile-card {
  width: 100%;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 82%, transparent);
  box-shadow: 0 1.5rem 4rem color-mix(in srgb, var(--color-text) 10%, transparent);
  user-select: none;
}

.profile-image-placeholder {
  aspect-ratio: 4 / 5;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 24% 24%, var(--color-profile-highlight), transparent 22%),
    linear-gradient(
      145deg,
      var(--color-accent-soft),
      var(--color-profile-gradient) 58%,
      var(--color-accent)
    );
}

.profile-image-placeholder > img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 24%;
  pointer-events: none;
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

figcaption {
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

figcaption p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding-top: 0.65rem;
  color: var(--color-muted);
  font-size: 0.78rem;
}

figcaption p span {
  width: 0.4rem;
  height: 0.4rem;
  position: relative;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.22rem var(--color-accent-soft);
}

figcaption p span::after {
  content: '';
  position: absolute;
  inset: -0.25rem;
  border: 1px solid var(--color-accent);
  border-radius: inherit;
  animation: availability-pulse 2s ease-out infinite;
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
</style>
