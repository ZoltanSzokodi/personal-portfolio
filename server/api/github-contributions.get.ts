import { siteConfig } from '#shared/data/site'

interface GitHubContributionCalendar {
  totalContributions: number
  months: Array<{
    name: string
    totalWeeks: number
  }>
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number
      date: string
      weekday: number
    }>
  }>
}

interface GitHubContributionData {
  calendar: GitHubContributionCalendar
  years: number[]
}

interface GitHubResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionYears: number[]
        contributionCalendar: GitHubContributionCalendar
      }
    }
  }
  errors?: Array<{ message: string }>
}

const contributionQuery = `
  query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          months {
            name
            totalWeeks
          }
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig(event)

  if (!githubToken) {
    throw createError({
      statusCode: 503,
      statusMessage: 'GitHub activity is not configured.',
    })
  }

  const requestedYear = getQuery(event).year
  const year = typeof requestedYear === 'string' && /^\d{4}$/.test(requestedYear)
    ? Number(requestedYear)
    : new Date().getUTCFullYear()
  const from = new Date(Date.UTC(year, 0, 1))
  const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999))

  const response = await $fetch<GitHubResponse>('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ZoltanSzokodi-portfolio',
    },
    body: {
      query: contributionQuery,
      variables: {
        login: siteConfig.githubUsername,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    },
  })

  const collection = response.data?.user?.contributionsCollection
  const calendar = collection?.contributionCalendar

  if (!calendar || response.errors?.length) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load GitHub activity.',
    })
  }

  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=43200')

  return {
    calendar,
    years: collection.contributionYears,
  } satisfies GitHubContributionData
})
