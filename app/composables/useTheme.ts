export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'
const THEME_COLORS: Record<Theme, string> = {
  light: '#f6f7f2',
  dark: '#101714',
}

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark'

const savedTheme = (): Theme | null => {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

const saveTheme = (theme: Theme) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

const preferredTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
}

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')
  let mediaQuery: MediaQueryList | undefined

  const setTheme = (nextTheme: Theme) => {
    theme.value = nextTheme
    saveTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const toggleTheme = () => setTheme(theme.value === 'light' ? 'dark' : 'light')

  const handleSystemThemeChange = (event: MediaQueryListEvent) => {
    if (savedTheme()) return

    theme.value = event.matches ? 'dark' : 'light'
    applyTheme(theme.value)
  }

  onMounted(() => {
    theme.value = savedTheme() ?? preferredTheme()
    applyTheme(theme.value)

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  onBeforeUnmount(() => mediaQuery?.removeEventListener('change', handleSystemThemeChange))

  return { theme, setTheme, toggleTheme }
}
