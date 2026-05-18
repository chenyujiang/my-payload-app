import { getCachedGlobal } from '@/utilities/getGlobals'

import { resolveBranding } from './resolveBranding'

export const getResolvedBranding = async () => {
  try {
    const branding = await getCachedGlobal('branding', 1)()

    return resolveBranding(branding)
  } catch {
    return resolveBranding(null)
  }
}
