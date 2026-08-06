export type ProjectVisual = 'fieldkit' | 'gather' | 'portfolio'

export interface Project {
  slug: string
  title: string
  label: string
  summary: string
  visual: ProjectVisual
  visualAlt: string
  tags: string[]
  role: string
  timeline: string
  challenge: string
  approach: string[]
  outcome: string
  learnings: string[]
}
