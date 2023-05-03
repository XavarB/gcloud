import uploadFeature from '@adminjs/upload';
import { File } from '../Models/file.js';

const GCScredentials = {
  serviceAccount: 'service-707043467119@gs-project-accounts.iam.gserviceaccount.com',
  bucket: 'ar_farishta',
  expires: 0,
};

const localProvider = {
  bucket: 'public/files',
  opts: {
    baseUrl: 'files',
  },
};

export const files = {
  resource: File,
  options: {
    properties: {
    
      bucket: {
        type: 'string',
       
      },
      mime: {
        type: 'string',
       
      },
      comment: {
        type: 'textarea',
        isSortable: false,
      },
    },
    actions:{  
      // new: {
      //   isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor',
      // },
      // list:{
      //   isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor',
      // },
      // delete:{
      //   isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'
      // },
      // bulkDelete:{
      //   isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      // },
      // edit: {
       
      //   isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      // },
      // show: {
        
      //   isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      // },
    },
  },
  features: [
    uploadFeature({
      provider: { gcp:GCScredentials },
      properties: {
        key: 'path',
      },
      multiple:false,
      validation: { mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg'] },
    }),
    // uploadFeature({
    //   provider: {
    //     local: {
    //       bucket: 'public/files',
    //       opts: {
    //         baseUrl: '/files',
    //       },
    //     }
    //   },
    //   properties: {
    //     key: `media.big.path`,
    //     mimeType: `media.big.mimeType`,
    //     size: `media.big.size`,
    //     bucket: `media.big.bucket`,
    //     filename: `media.big.filename`,
    //     file: `media.big.file`,
    //     filePath: `media.big.filePath`,
    //     filesToDelete: `media.big.filesToDelete`,
    //   },
    //   validation: {
    //     mimeTypes: ['image/jpeg', 'image/png']
    //   },
    //   uploadPath: (record, filename) => (
    //     `${record.id()}/media.big/${filename}`
    //   ),
    // }),
    // uploadFeature({
    //   provider: {
    //     local: {
    //       bucket: 'public/files',
    //       opts: {
    //         baseUrl: '/files',
    //       },
    //     }
    //   },
    //   properties: {
    //     key: `media.small.path`,
    //     mimeType: `media.small.mimeType`,
    //     size: `media.small.size`,
    //     bucket: `media.small.bucket`,
    //     filename: `media.small.filename`,
    //     file: `media.small.file`,
    //     filePath: `media.small.filePath`,
    //     filesToDelete: `media.small.filesToDelete`,
    //   },
    //   validation: {
    //     mimeTypes: ['image/jpeg', 'image/png']
    //   },
    //   uploadPath: (record, filename) => (
    //     `${record.id()}/media.small/${filename}`
    //   ),
    // })
  ],
};
// module.exports = {files}