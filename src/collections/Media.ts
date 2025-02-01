import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
  },
  fields: [],
}
