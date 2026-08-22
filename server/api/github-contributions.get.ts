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

interface GitHubResponse {
  data?: {
    user?: {
      contributionsCollection: {
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

  const to = new Date()
  const from = new Date(to)
  from.setUTCFullYear(from.getUTCFullYear() - 1)

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

  const calendar = response.data?.user?.contributionsCollection.contributionCalendar

  if (!calendar || response.errors?.length) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load GitHub activity.',
    })
  }

  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=43200')

  return calendar
})
