<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string
    active: boolean
    delay?: number
  }>(),
  { delay: 0 },
)

const REEL_CYCLES = 3
const reelDigits = Array.from({ length: (REEL_CYCLES + 1) * 10 }, (_, index) => index % 10)
const digits = computed(() => props.value.match(/\d/g) ?? [])
const suffix = computed(() => props.value.replace(/\d/g, ''))

const reelStyle = (digit: string, index: number) => ({
  '--slot-stop': REEL_CYCLES * 10 + Number(digit),
  '--slot-delay': `${props.delay + index * 90}ms`,
})
</script>

<template>
  <span class="slot-counter" :class="{ 'slot-counter--active': active }" :aria-label="value">
    <span v-for="(digit, index) in digits" :key="index" class="slot-counter__window" aria-hidden="true">
      <span class="slot-counter__reel" :style="reelStyle(digit, index)">
        <span v-for="(reelDigit, reelIndex) in reelDigits" :key="reelIndex">{{ reelDigit }}</span>
      </span>
    </span>
    <span v-if="suffix" aria-hidden="true">{{ suffix }}</span>
  </span>
</template>

<style scoped>
.slot-counter {
  display: inline-flex;
  align-items: flex-start;
  height: 0.9em;
  overflow: hidden;
  vertical-align: top;
  line-height: 0.9;
}

.slot-counter__window {
  width: 0.64em;
  height: 0.9em;
  overflow: hidden;
}

.slot-counter__reel {
  display: flex;
  flex-direction: column;
  transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) var(--slot-delay);
  will-change: transform;
}

.slot-counter__reel > span {
  height: 0.9em;
  line-height: 0.9;
}

.slot-counter--active .slot-counter__reel {
  transform: translateY(calc(var(--slot-stop) * -0.9em));
}

@media (prefers-reduced-motion: reduce) {
  .slot-counter__reel {
    transition: none;
  }
}
</style>
