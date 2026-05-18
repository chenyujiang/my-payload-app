import { defaultLogoUrl } from './resolveBranding'
import { getResolvedBranding } from './getBranding'
import React from 'react'

import './admin.scss'

const AdminIcon = async () => {
  const resolved = await getResolvedBranding()
  const icon = resolved.darkModeLogo || resolved.logo

  return (
    <img
      alt={icon?.alt || resolved.brandName}
      className="white-label-admin-icon"
      decoding="async"
      src={icon?.url || defaultLogoUrl}
    />
  )
}

export default AdminIcon
