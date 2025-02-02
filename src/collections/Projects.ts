import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {},
  access: {
    read: ({ req }) => {
      console.log('Access check for projects:', req.method, req.url)
      return true
    },
  },
  fields: [
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'group',
      fields: [
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'behance',
          type: 'text',
        },
        {
          name: 'details',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
            },
            {
              name: 'content',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'grid',
          type: 'text',
          label: 'Grid Position',
        },
        {
          name: 'desktopImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
