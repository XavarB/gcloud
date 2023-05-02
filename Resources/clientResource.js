import { ClientsS1 } from '../Models/clientsS1.js';
import { Components } from '../component/componentInit.js'
import pdfGenerator from '../component/Pdf.js'
import bulkPdfGenerator from '../component/bulkPdf.js'
import path from 'path'
import fileDirName from '../file-dir-name.js'
export const {__dirname,__filename} = fileDirName(import.meta)

import uploadFeature from '@adminjs/upload';
const localProvider = {
  bucket: 'public/files',
  opts: {
    baseUrl: '/files',
  },
};

const GCScredentials = {
  serviceAccount: 'farishta@thinking-park-382005.iam.gserviceaccount.com',
  bucket: 'ar_farishta',
  key:path.join(__dirname,"../thinking-park-382005-7da47767c960.json"),
  expires: 0,
  projectId:'thinking-park-382005',
};


export const clientResource = {
  resource: ClientsS1,
  options: {
    properties: {
      incomeTotal: {
        type: 'String',
        components: {
          show: Components.ClientIncomeTotal,
          list: Components.ClientIncomeTotal
        }
      },
      Paymentpayable: {
        type: 'String',
        components: {
          show: Components.Paymentpayable,
          list: Components.Paymentpayable
        }
      },
      // expenseTotal:{
      //   type:'String',
      //   components:{
      //     show: Components.ClientExpenseTotal,
      //     list: Components.ClientExpenseTotal
      //   }
      // },
      path: {
        isVisible: {
          edit: false,

          // label:"Label Chenage",
          // description: "User's Linkedin/Github/social profiles links",
        }
      },
      //   expenseTotal:{
      //     isVisible :{
      //       // edit: false,

      //   }
      // }
    },
    actions: {
      PdfGen: {
        actionType: 'record',
        icon: 'GeneratePdf',
        component: Components.PdfGen,
        handler: (request, response, context) => {
          const { record, currentAdmin } = context
          return {
            record: record.toJSON(currentAdmin),
            url: pdfGenerator(record.toJSON(currentAdmin), 'clientsS1')
          }
        }
      },
      bulkPdf: {
        actionType: 'bulk',
        icon: 'GeneratePdf',
        component: Components.BulkPdfGen,
        handler: (request, response, context) => {
          const { records, currentAdmin } = context
          const recordsInJSON = records.map(record => record.toJSON(context.currentAdmin))
          return {
            records: recordsInJSON,
            url: bulkPdfGenerator(records, 'clientsS1')
          }
        }
      },
      new: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin' || currentAdmin.role === 'editor' || currentAdmin.role === 'guest',
      },
      list: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin' || currentAdmin.role === 'editor' || currentAdmin.role === 'guest',
      },
      delete: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin',
      },
      bulkDelete: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin',
      },
      edit: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin' || currentAdmin.role === 'editor',
      },
      show: {
        isVisible: ({ currentAdmin }) => currentAdmin.role === 'admin' || currentAdmin.role === 'editor',
      },

    }
  },
  features: [
    uploadFeature({
      provider: { local:localProvider },
      properties: {
        description: "User's Linkedin/Github/social profiles links",
        key: 'path',
        file: 'Photo'
      },
      validation: { mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg'] },
    }),


  ],
}