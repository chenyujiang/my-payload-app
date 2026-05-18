import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import { defaultFaviconUrl, resolveBranding } from '../resolveBranding'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const branding = await payload
    .findGlobal({
      slug: 'branding',
      depth: 1,
    })
    .catch(() => null)
  const { faviconUrl } = resolveBranding(branding)

  redirect(faviconUrl || defaultFaviconUrl)
}
