<script setup lang="ts">
interface ContributionDay {
  contributionCount: number
  date: string
  weekday: number
}

interface ContributionCalendar {
  totalContributions: number
  months: Array<{
    name: string
    totalWeeks: number
  }>
  weeks: Array<{
    contributionDays: ContributionDay[]
  }>
}

const props = defineProps<{
  username: string
}>()

const { data: calendar, status } = await useFetch<ContributionCalendar>(
  '/api/github-contributions',
  {
    server: false,
  },
)

const highestContributionCount = computed(() => {
  const counts = calendar.value?.weeks.flatMap((week) =>
    week.contributionDays.map((day) => day.contributionCount),
  )

  return Math.max(...(counts?.filter((count) => count > 0) ?? [1]))
})

const contributionLevel = (count: number) => {
  if (count === 0) return 0

  const ratio = count / highestContributionCount.value
  if (ratio > 0.75) return 4
  if (ratio > 0.45) return 3
  if (ratio > 0.2) return 2
  return 1
}

const contributionLabel = (day: ContributionDay) => {
  const amount = day.contributionCount
  return `${day.date}: ${amount} contribution${amount === 1 ? '' : 's'}`
}
</script>

<template>
  <section class="contribution-grid" aria-labelledby="contribution-title">
    <div class="contribution-grid__heading">
      <div>
        <p class="contribution-grid__eyebrow">GitHub activity</p>
        <h3 id="contribution-title">
          <template v-if="calendar">
            {{ calendar.totalContributions.toLocaleString() }} contributions in the last year
          </template>
          <template v-else>Contributions in the last year</template>
        </h3>
      </div>

      <a :href="`https://github.com/${props.username}`" target="_blank" rel="noopener noreferrer">
        @{{ props.username }} <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div v-if="calendar" class="contribution-grid__scroll">
      <div class="contribution-grid__months" aria-hidden="true">
        <span
          v-for="month in calendar.months"
          :key="`${month.name}-${month.totalWeeks}`"
          :style="{ gridColumn: `span ${month.totalWeeks}` }"
        >
          {{ month.name }}
        </span>
      </div>

      <div
        class="contribution-grid__calendar"
        role="grid"
        aria-label="GitHub contributions over the last year"
      >
        <div
          v-for="(week, weekIndex) in calendar.weeks"
          :key="weekIndex"
          class="contribution-grid__week"
          role="row"
        >
          <span
            v-for="day in week.contributionDays"
            :key="day.date"
            class="contribution-grid__day"
            :class="`contribution-grid__day--level-${contributionLevel(day.contributionCount)}`"
            role="gridcell"
            :aria-label="contributionLabel(day)"
            :title="contributionLabel(day)"
          />
        </div>
      </div>
    </div>

    <p v-else-if="status === 'pending'" class="contribution-grid__status">Loading activity…</p>
    <p v-else class="contribution-grid__status">GitHub activity is temporarily unavailable.</p>

    <div
      v-if="calendar"
      class="contribution-grid__legend"
      aria-label="Contribution intensity legend"
    >
      <span>Less</span>
      <i v-for="level in 5" :key="level" :class="`contribution-grid__day--level-${level - 1}`" />
      <span>More</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contribution-grid {
  margin-top: clamp(4rem, 8vw, 7rem);
  padding: clamp(1.25rem, 3vw, 2.25rem);
  border: 1px solid var(--color-line);
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--color-surface) 74%, transparent);
}

.contribution-grid__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.contribution-grid__eyebrow {
  margin: 0;
  color: var(--color-accent-dark);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contribution-grid h3 {
  margin: 0.55rem 0 0;
  font-size: clamp(1.4rem, 2.4vw, 2rem);
  font-weight: 550;
  letter-spacing: -0.045em;
  line-height: 1.1;
}

.contribution-grid__heading a {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

.contribution-grid__heading a:hover {
  color: var(--color-accent-dark);
}

.contribution-grid__scroll {
  overflow-x: auto;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  padding-bottom: 0.35rem;
}

.contribution-grid__months,
.contribution-grid__calendar {
  width: max-content;
  display: grid;
  grid-template-columns: repeat(53, 0.78rem);
  gap: 0.28rem;
}

.contribution-grid__months {
  min-height: 1.25rem;
  align-items: start;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
}

.contribution-grid__week {
  display: grid;
  grid-template-rows: repeat(7, 0.78rem);
  gap: 0.28rem;
}

.contribution-grid__day {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 0.16rem;
  background: var(--color-line-soft);
}

.contribution-grid__day--level-1 {
  background: color-mix(in srgb, var(--color-accent) 30%, var(--color-line-soft));
}

.contribution-grid__day--level-2 {
  background: color-mix(in srgb, var(--color-accent) 52%, var(--color-line-soft));
}

.contribution-grid__day--level-3 {
  background: color-mix(in srgb, var(--color-accent) 74%, var(--color-line-soft));
}

.contribution-grid__day--level-4 {
  background: var(--color-accent);
}

.contribution-grid__legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  margin-top: 1.25rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.contribution-grid__legend i {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 0.16rem;
  background: var(--color-line-soft);
}

.contribution-grid__status {
  min-height: 6rem;
  display: grid;
  place-items: center;
  margin: 1.5rem 0 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

@media (max-width: 38rem) {
  .contribution-grid__heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
