export interface ContactLink {
  label: string
  value: string
  href: string
}

export interface SiteConfig {
  name: string
  initials: string
  role: string
  description: string
  location: string
  availability: string
  contacts: ContactLink[]
}
