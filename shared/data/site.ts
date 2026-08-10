import type { SiteConfig } from '../types/site'

export const siteConfig = {
  name: 'Zoltan',
  fullName: 'Zoltan Szokodi',
  initials: 'ZS',
  profileImage: '/profile.jpg',
  role: 'Software engineer · React Native',
  description:
    'React Native software engineer building reliable mobile products and exploring the Vue and Nuxt ecosystem.',
  location: 'Your location',
  availability: 'Open for hire',
  contacts: [
    {
      label: 'Email',
      value: 'you@example.com',
      href: 'mailto:you@example.com',
    },
    {
      label: 'GitHub',
      value: 'your-handle',
      href: 'https://github.com/your-handle',
    },
    {
      label: 'LinkedIn',
      value: 'your-profile',
      href: 'https://www.linkedin.com/in/your-profile',
    },
  ],
} satisfies SiteConfig
