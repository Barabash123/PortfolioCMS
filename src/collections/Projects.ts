import type { CollectionConfig, PayloadRequest } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {},
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Slug, will be use for routing',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'previewMobile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'dateRange',
      type: 'text',
    },
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'description',
      type: 'group',
      fields: [
        {
          name: 'about',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
            },
          ],
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
                  type: 'array',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      label: 'Media content (will be position in the row in desktop, and in column on mobile)',
      type: 'array',
      fields: [
        {
          name: 'desktopImage',
          type: 'array',
          fields: [
            {
              name: 'url',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'mobileImage',
          type: 'array',
          fields: [
            {
              name: 'url',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
