import type { GlobalConfig } from 'payload'

import { revalidateBranding } from './hooks/revalidateBranding'

export const Branding: GlobalConfig = {
  slug: 'branding',
  label: 'Branding',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Payload Website Template',
      label: 'Brand name',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Primary logo used in the site header and admin login.',
            width: '50%',
          },
          label: 'Logo',
        },
        {
          name: 'darkModeLogo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional logo shown when the UI is in dark mode.',
            width: '50%',
          },
          label: 'Dark mode logo',
        },
      ],
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon used by the browser tab and Payload admin.',
      },
      label: 'Favicon',
    },
  ],
  hooks: {
    afterChange: [revalidateBranding],
  },
}
