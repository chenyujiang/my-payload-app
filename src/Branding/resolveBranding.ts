import type { Branding, Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export type BrandingImage = {
  alt: string
  height?: number | null
  url: string
  width?: number | null
}

export type ResolvedBranding = {
  brandName: string
  darkModeLogo: BrandingImage | null
  faviconUrl: string
  logo: BrandingImage | null
}

export const defaultBrandName = 'Payload Website Template'
export const defaultFaviconUrl = '/favicon.ico'
export const defaultLogoUrl =
  'https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-logo-light.svg'

const isMedia = (value: Media | number | null | undefined): value is Media =>
  typeof value === 'object' && value !== null && 'url' in value

const resolveImage = (
  media: Media | number | null | undefined,
  fallbackAlt: string,
): BrandingImage | null => {
  if (!isMedia(media) || !media.url) return null

  return {
    alt: media.alt || fallbackAlt,
    height: media.height,
    url: getMediaUrl(media.url, media.updatedAt),
    width: media.width,
  }
}

export const resolveBranding = (branding?: Partial<Branding> | null): ResolvedBranding => {
  const brandName = branding?.brandName || defaultBrandName
  const logo = resolveImage(branding?.logo, brandName)
  const darkModeLogo = resolveImage(branding?.darkModeLogo, brandName)
  const favicon = resolveImage(branding?.favicon, `${brandName} favicon`)

  return {
    brandName,
    darkModeLogo,
    faviconUrl: favicon?.url || defaultFaviconUrl,
    logo,
  }
}
