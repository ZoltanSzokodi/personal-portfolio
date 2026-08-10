export interface ContactLink {
  label: string
  value: string
  href: string
}

export interface SiteConfig {
  name: string
  fullName: string
  initials: string
  profileImage: string
  role: string
  description: string
  location: string
  availability: string
  contacts: ContactLink[]
}
