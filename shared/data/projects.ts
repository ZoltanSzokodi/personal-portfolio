import type { Project } from '../types/project'

export const projects = [
  {
    slug: 'fieldkit',
    title: 'FieldKit',
    label: 'Sample mobile case study',
    summary:
      'An offline-first reporting concept for field teams working with unreliable connectivity.',
    visual: 'fieldkit',
    visualAlt:
      'Abstract mobile interface showing a field report, connection status, and queued upload.',
    tags: ['React Native', 'TypeScript', 'Expo', 'SQLite'],
    role: 'Mobile engineering',
    timeline: 'Concept project',
    challenge:
      'Technicians need to capture notes, photos, and sign-off without losing work or submitting duplicate reports when connectivity changes.',
    approach: [
      'Persist drafts locally so every edit survives an app restart or dropped connection.',
      'Model queued, syncing, complete, and failed states explicitly in the interface.',
      'Use a retry-safe upload queue and clear recovery actions instead of silent background failure.',
    ],
    outcome: 'A resilient prototype and sync model ready for API integration.',
    learnings: [
      'Connectivity is application state, not an exceptional edge case.',
      'Recovery paths deserve the same design attention as the happy path.',
    ],
  },
  {
    slug: 'gather',
    title: 'Gather',
    label: 'Sample mobile case study',
    summary:
      'An event-discovery concept built around fast search, saved events, and readable detail views.',
    visual: 'gather',
    visualAlt: 'Abstract event discovery interface with search, date filters, and event cards.',
    tags: ['React Native', 'TypeScript', 'Expo Router', 'TanStack Query'],
    role: 'Product engineering',
    timeline: 'Concept project',
    challenge:
      'Long lists, filters, cached results, deep links, and loading states all need to remain predictable as people move through the app.',
    approach: [
      'Separate server state from local interface state and cache results by filter combination.',
      'Keep list rendering stable while new pages load and preserve position across navigation.',
      'Treat empty, stale, loading, and failure states as first-class product states.',
    ],
    outcome:
      'A coherent prototype demonstrating navigation, data-state, and performance decisions without invented usage metrics.',
    learnings: [
      'Explicit data states make a busy interface feel calm and dependable.',
      'Route-driven detail views simplify deep linking and state restoration.',
    ],
  },
  {
    slug: 'nuxt-portfolio',
    title: 'This Portfolio',
    label: 'Web learning project',
    summary:
      'A statically generated portfolio built while translating React experience into Vue and Nuxt.',
    visual: 'portfolio',
    visualAlt: 'Abstract browser interface showing portfolio sections and a component tree.',
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'CSS'],
    role: 'Design & engineering',
    timeline: 'Current',
    challenge:
      'Create dynamic case-study routes with strong metadata and GitHub Pages-compatible output while keeping the stack intentionally small.',
    approach: [
      'Drive project cards and routes from one typed local data source.',
      'Prerender every route while preserving Vue navigation and progressive enhancement.',
      'Build the visual system with CSS tokens and scoped component styles rather than a UI library.',
    ],
    outcome: 'A fast, accessible static site with no runtime backend.',
    learnings: [
      'Vue composables feel familiar, but their reactivity model rewards Vue-native thinking.',
      'A framework can reduce complexity when its conventions match the product.',
    ],
  },
] satisfies Project[]

export const projectRoutes = projects.map((project) => `/projects/${project.slug}`)

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
