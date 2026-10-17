/** Keep local media in the current deployment, including project-site previews. */
export function assetUrl(
  path: string | undefined,
  base = import.meta.env.BASE_URL,
): string | undefined {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return `${base.endsWith('/') ? base : `${base}/`}${path.slice(1)}`
}
