import 'payload'

declare module 'payload' {
  export interface Payload {
    gcs: {
      upload: (args: { file: any; filename: string }) => Promise<string>
      delete: (filename: string) => Promise<void>
    }
  }
}
