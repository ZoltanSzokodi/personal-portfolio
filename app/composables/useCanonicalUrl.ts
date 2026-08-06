export function useCanonicalUrl(path: MaybeRefOrGetter<string>) {
  const config = useRuntimeConfig()

  return computed(() => {
    const siteUrl = config.public.siteUrl.endsWith('/')
      ? config.public.siteUrl
      : `${config.public.siteUrl}/`
    const relativePath = toValue(path).replace(/^\//, '')

    return new URL(relativePath, siteUrl).toString()
  })
}
