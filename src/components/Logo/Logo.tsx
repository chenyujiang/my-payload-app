import clsx from 'clsx'
import React from 'react'

import type { ResolvedBranding } from '@/Branding/resolveBranding'

import { defaultLogoUrl } from '@/Branding/resolveBranding'

interface Props {
  branding?: ResolvedBranding
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { branding, loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logo = branding?.logo
  const darkModeLogo = branding?.darkModeLogo
  const alt = logo?.alt || branding?.brandName || 'Payload Logo'
  const width = logo?.width || 193
  const height = logo?.height || 34

  if (darkModeLogo) {
    return (
      <>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('max-w-[9.375rem] w-full h-[34px] object-contain dark:hidden', className)}
          src={logo?.url || defaultLogoUrl}
        />
        <img
          alt={darkModeLogo.alt || alt}
          width={darkModeLogo.width || width}
          height={darkModeLogo.height || height}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx(
            'max-w-[9.375rem] w-full h-[34px] object-contain hidden dark:block',
            className,
          )}
          src={darkModeLogo.url}
        />
      </>
    )
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px] object-contain', className)}
      src={logo?.url || defaultLogoUrl}
    />
  )
}
