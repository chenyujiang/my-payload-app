import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { getResolvedBranding } from '@/Branding/getBranding'

export async function Header() {
  const [headerData, branding] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getResolvedBranding(),
  ])

  return <HeaderClient branding={branding} data={headerData} />
}
