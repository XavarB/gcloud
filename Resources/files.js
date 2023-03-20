import uploadFeature from '@adminjs/upload';
import { File } from '../Models/file.js';

const localProvider = {
  bucket: 'public/files',
  opts: {
    baseUrl: '/files',
  },
};

export const files = {
  resource: File,
  options: {
    properties: {
      name: { type: 'String',  },
      bucket: {type: 'string', },
      mime: { type: 'string', },
      comment: {type: 'string', required:true },
    },
    actions:{  
      new: {
        isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor',
      },
      list:{
        isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor',
      },
      delete:{
        isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'
      },
      bulkDelete:{
        isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      },
      edit: {
       
        isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      },
      show: {
        
        isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
      },
    },
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      properties: {
        key: 'path',
      },
      validation: { mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg'] },
    }),
  ],
};
// module.exports = {files}