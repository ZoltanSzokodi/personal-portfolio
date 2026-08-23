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

interface ContributionData {
  calendar: ContributionCalendar
  years: number[]
}

const props = defineProps<{
  username: string
}>()

const selectedYear = ref(new Date().getFullYear())

const { data, status } = useFetch<ContributionData>(
  '/api/github-contributions',
  {
    server: false,
    query: { year: selectedYear },
    watch: [selectedYear],
  },
)

const calendar = computed(() => data.value?.calendar)
const years = computed(() => data.value?.years ?? [])
const yearsInDisplayOrder = computed(() => [...years.value].reverse())

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
            {{ calendar.totalContributions.toLocaleString() }} contributions in {{ selectedYear }}
          </template>
          <template v-else>Contributions</template>
        </h3>
      </div>

      <a :href="`https://github.com/${props.username}`" target="_blank" rel="noopener noreferrer">
        @{{ props.username }} <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div v-if="yearsInDisplayOrder.length" class="contribution-grid__years" aria-label="Contribution years">
      <button
        v-for="year in yearsInDisplayOrder"
        :key="year"
        type="button"
        :class="{ 'contribution-grid__year--active': year === selectedYear }"
        :aria-pressed="year === selectedYear"
        @click="selectedYear = year"
      >
        {{ year }}
      </button>
    </div>

    <div v-if="calendar" class="contribution-grid__scroll">
      <div class="contribution-grid__plot">
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
    </div>

    <p v-else-if="status === 'pending'" class="contribution-grid__status">Loading activity…</p>
    <p v-else class="contribution-grid__status">GitHub activity is temporarily unavailable.</p>

    <div v-if="calendar" class="contribution-grid__footer">
      <p class="contribution-grid__note">Parental leave · September 2025–January 2026</p>

      <div class="contribution-grid__legend" aria-label="Contribution intensity legend">
        <span>Less</span>
        <i v-for="level in 5" :key="level" :class="`contribution-grid__day--level-${level - 1}`" />
        <span>More</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contribution-grid {
  width: min(100%, 72rem);
  margin-top: clamp(1rem, 2vw, 1.5rem);
  margin-inline: auto;
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

.contribution-grid__years {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
}

.contribution-grid__years button {
  flex: 0 0 auto;
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--color-line);
  border-radius: 0.4rem;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
}

.contribution-grid__years button:hover,
.contribution-grid__years button:focus-visible,
.contribution-grid__years .contribution-grid__year--active {
  border-color: var(--color-accent-dark);
  background: color-mix(in srgb, var(--color-accent) 13%, transparent);
  color: var(--color-accent-dark);
}

.contribution-grid__scroll {
  overflow-x: auto;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  padding-bottom: 0.35rem;
}

.contribution-grid__plot {
  width: max-content;
  margin-inline: auto;
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

.contribution-grid__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 1.25rem;
}

.contribution-grid__note,
.contribution-grid__legend {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.contribution-grid__legend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.contribution-grid__legend i {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 0.16rem;
}

.contribution-grid__legend i.contribution-grid__day--level-0 {
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

  .contribution-grid__scroll {
    .contribution-grid__plot {
      margin-inline: 0;
    }
  }

  .contribution-grid__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
