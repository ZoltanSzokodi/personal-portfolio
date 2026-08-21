<script setup lang="ts">
const SPRING_STIFFNESS = 120
const SPRING_DAMPING = 14
const SPRING_MASS = 1
const FLEE_DISTANCE = 200
const RESET_DISTANCE = 350
const FLEE_FORCE = 160
const MAX_OFFSET = 280

const taunts = [
  "You can't catch me! 😆",
  'Nice try! 👍',
  'Too slow! 🏃‍♂️',
  'Almost got me! 😏',
  'Keep trying! 🎯',
  'Haha, missed! 😂',
] as const

const cardRunner = ref<HTMLElement | null>(null)
const chaseEnabled = ref(false)
const isTauntVisible = ref(false)
const taunt = ref('')
const renderedPosition = reactive({ x: 0, y: 0 })

const targetPosition = { x: 0, y: 0 }
const velocity = { x: 0, y: 0 }

let animationFrame: number | null = null
let previousFrameTime: number | null = null
let nearbyMoveCount = 0
let lastTauntTime = 0
let tauntTimer: ReturnType<typeof setTimeout> | null = null
let pointerQuery: MediaQueryList | null = null
let reducedMotionQuery: MediaQueryList | null = null

const runnerStyle = computed(() => ({
  transform: `translate3d(${renderedPosition.x}px, ${renderedPosition.y}px, 0)`,
}))

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value))

const stopSpring = () => {
  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame)
  }

  animationFrame = null
  previousFrameTime = null
}

const stepSpring = (time: number) => {
  if (previousFrameTime === null) {
    previousFrameTime = time
  }

  const deltaTime = Math.min((time - previousFrameTime) / 1000, 0.064)
  previousFrameTime = time

  const forceX = -SPRING_STIFFNESS * (renderedPosition.x - targetPosition.x)
  const forceY = -SPRING_STIFFNESS * (renderedPosition.y - targetPosition.y)
  const dampingX = -SPRING_DAMPING * velocity.x
  const dampingY = -SPRING_DAMPING * velocity.y

  velocity.x += ((forceX + dampingX) / SPRING_MASS) * deltaTime
  velocity.y += ((forceY + dampingY) / SPRING_MASS) * deltaTime
  renderedPosition.x += velocity.x * deltaTime
  renderedPosition.y += velocity.y * deltaTime

  const isSettled =
    Math.abs(renderedPosition.x - targetPosition.x) < 0.01 &&
    Math.abs(renderedPosition.y - targetPosition.y) < 0.01 &&
    Math.abs(velocity.x) < 0.01 &&
    Math.abs(velocity.y) < 0.01

  if (isSettled) {
    renderedPosition.x = targetPosition.x
    renderedPosition.y = targetPosition.y
    velocity.x = 0
    velocity.y = 0
    animationFrame = null
    previousFrameTime = null
    return
  }

  animationFrame = window.requestAnimationFrame(stepSpring)
}

const startSpring = () => {
  if (animationFrame === null) {
    previousFrameTime = null
    animationFrame = window.requestAnimationFrame(stepSpring)
  }
}

const showTaunt = () => {
  const currentTime = Date.now()

  if (currentTime - lastTauntTime < 2500) {
    return
  }

  lastTauntTime = currentTime
  taunt.value = taunts[Math.floor(Math.random() * taunts.length)] ?? taunts[0]
  isTauntVisible.value = true

  if (tauntTimer !== null) {
    clearTimeout(tauntTimer)
  }

  tauntTimer = setTimeout(() => {
    isTauntVisible.value = false
    tauntTimer = null
  }, 2000)
}

const moveAwayFrom = (clientX: number, clientY: number) => {
  if (!chaseEnabled.value || !cardRunner.value) {
    return
  }

  const cardBounds = cardRunner.value.getBoundingClientRect()
  const cardCenterX = cardBounds.left + cardBounds.width / 2
  const cardCenterY = cardBounds.top + cardBounds.height / 2
  const distanceX = clientX - cardCenterX
  const distanceY = clientY - cardCenterY
  const distance = Math.hypot(distanceX, distanceY)

  if (distance < FLEE_DISTANCE && distance > 0) {
    nearbyMoveCount += 1

    if (nearbyMoveCount >= 3) {
      showTaunt()
      nearbyMoveCount = 0
    }

    const angle = Math.atan2(distanceY, distanceX)
    const strength = Math.pow((FLEE_DISTANCE - distance) / FLEE_DISTANCE, 0.6)
    const forceX = -Math.cos(angle) * strength * FLEE_FORCE
    const forceY = -Math.sin(angle) * strength * FLEE_FORCE

    targetPosition.x = clamp(targetPosition.x + forceX * 0.25, -MAX_OFFSET, MAX_OFFSET)
    targetPosition.y = clamp(targetPosition.y + forceY * 0.25, -MAX_OFFSET, MAX_OFFSET)
    startSpring()
  } else if (distance > RESET_DISTANCE) {
    targetPosition.x = Math.abs(targetPosition.x) < 1 ? 0 : targetPosition.x * 0.85
    targetPosition.y = Math.abs(targetPosition.y) < 1 ? 0 : targetPosition.y * 0.85
    startSpring()
  }
}

const resetTarget = () => {
  targetPosition.x = 0
  targetPosition.y = 0
  startSpring()
}

const handlePointerMove = (event: PointerEvent) => {
  if (event.pointerType !== 'touch') {
    moveAwayFrom(event.clientX, event.clientY)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  moveAwayFrom(event.clientX, event.clientY)
}

const updateChaseCapability = () => {
  chaseEnabled.value = Boolean(pointerQuery?.matches && !reducedMotionQuery?.matches)

  if (!chaseEnabled.value) {
    stopSpring()
    targetPosition.x = 0
    targetPosition.y = 0
    renderedPosition.x = 0
    renderedPosition.y = 0
    velocity.x = 0
    velocity.y = 0
    isTauntVisible.value = false
  }
}

onMounted(() => {
  pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateChaseCapability()
  pointerQuery.addEventListener('change', updateChaseCapability)
  reducedMotionQuery.addEventListener('change', updateChaseCapability)
})

onBeforeUnmount(() => {
  stopSpring()
  pointerQuery?.removeEventListener('change', updateChaseCapability)
  reducedMotionQuery?.removeEventListener('change', updateChaseCapability)

  if (tauntTimer !== null) {
    clearTimeout(tauntTimer)
  }
})
</script>

<template>
  <div
    class="profile-playground"
    @pointermove="handlePointerMove"
    @pointerleave="resetTarget"
    @mousemove="handleMouseMove"
    @mouseleave="resetTarget"
  >
    <div
      ref="cardRunner"
      class="profile-card-runner"
      :style="runnerStyle"
      @pointerenter="handlePointerMove"
      @pointermove="handlePointerMove"
      @mouseenter="handleMouseMove"
      @mousemove="handleMouseMove"
    >
      <div
        class="profile-taunt"
        :class="{ 'profile-taunt--visible': isTauntVisible }"
        aria-hidden="true"
      >
        {{ taunt }}
      </div>

      <ProfileCard />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/breakpoints' as bp;

.profile-playground {
  --profile-playground-gutter: max(var(--gutter), calc((100vw - var(--content-width)) / 2));

  width: 50vw;
  height: 100%;
  min-height: clamp(30rem, 62svh, 43rem);
  position: relative;
  display: grid;
  place-items: center end;
  justify-self: end;
  margin-right: calc(0px - var(--profile-playground-gutter));
  padding-right: var(--profile-playground-gutter);
  overflow: visible;
}

.profile-card-runner {
  width: min(100%, 17.3rem);
  position: relative;
  will-change: transform;
}

.profile-taunt {
  position: absolute;
  top: -3rem;
  left: 50%;
  z-index: 2;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--color-accent);
  box-shadow: 0 0.75rem 2rem color-mix(in srgb, var(--color-text) 16%, transparent);
  color: var(--color-surface);
  font-size: 0.78rem;
  font-weight: 700;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 0.5rem) scale(0.95);
  transition:
    opacity 300ms ease,
    transform 300ms ease;
  white-space: nowrap;
}

.profile-taunt--visible {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

@include bp.tablet-and-down {
  .profile-playground {
    display: none;
  }
}
</style>
