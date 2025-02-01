import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { gcsStorage } from '@payloadcms/storage-gcs'
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    gcsStorage({
      // Set the bucket name
      bucket: process.env.GCS_BUCKET || '',

      // Configure which collections should use GCS
      collections: {
        media: {
          // Optional: Configure specific options for the media collection
          prefix: 'media/', // Add a prefix to all uploaded files
          generateFileURL: ({ filename }) => {
            const url = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/media/${filename}`
            console.log(url, '_____')
            return url
          },
        },
      },

      // Optional: Set ACL (access control)
      acl: 'Public',

      // Configure GCS client options
      options: {
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: JSON.parse(process.env.GCS_KEY || '{}'),
      },

      // Optional: Enable/disable the plugin
      enabled: true,
    }),
  ],
})
