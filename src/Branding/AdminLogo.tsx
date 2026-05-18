import { defaultLogoUrl } from './resolveBranding'
import { getResolvedBranding } from './getBranding'
import React from 'react'

import './admin.scss'

const AdminLogo = async () => {
  const resolved = await getResolvedBranding()
  const logo = resolved.logo

  return (
    <img
      alt={logo?.alt || resolved.brandName}
      className="white-label-admin-logo"
      decoding="async"
      src={logo?.url || defaultLogoUrl}
    />
  )
}

export default AdminLogo
