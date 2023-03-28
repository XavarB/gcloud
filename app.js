import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import mongoose from 'mongoose'
import  session from 'express-session'
import  MongoDBSession from 'connect-mongodb-session';
import  cors from 'cors'
import bodyParser from 'body-parser'
// var  from '.js')

import  AdminJSMongoose from '@adminjs/mongoose';

import  {Employees} from './Models/employees.js'
import  {Agent} from './Models/agent.js'
import  {Employers} from './Models/employers.js'
import  {ClientsS1} from './Models/clientsS1.js';
import  {Income} from './Models/income.js'
import  {Expense} from './Models/expense.js'
import {Users} from './Models/users.js'

import { files } from './Resources/files.js';


// Resource Imports
import {clientResource} from './Resources/clientResource.js';

const MongoDBStore = MongoDBSession(session)


import pdfGenerator from './component/Pdf.js'

// Import Components
import path from 'path'
import {Components,componentLoader} from './component/componentInit.js'
import fileDirName from './file-dir-name.js'
export const {__dirname,__filename} = fileDirName(import.meta)



AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const PORT = process.env.PORT || 3004
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email, password) => {
  let user = await Users.findOne({ email: email, password: password }).exec();
  if (user) {
    return Promise.resolve(user)
  }
  return null
}


const dashboardHandler = async () => {
  // Asynchronous code where you, e. g. fetch data from your database
  const allUsers = await Users.find();
  const allClientsS1 = await ClientsS1.find();
  const allEmployees = await Employees.find();
  const allExpense = await Expense.find();
  const allIncome = await Income.find();
  return { message: 'Hello World', users:allUsers, clients: allClientsS1,employees:  allEmployees,expense:allExpense,income:allIncome,  }
  // return { ClientsS1:allClientsS1 }
}

const start = async () => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/login',async(req,res)=>{
    let user = await Users.findOne({ email: req.body.email, password: req.body.password }).exec();
    // console.log(user)
    if (user,ClientsS1) {
          return Promise.resolve(user, clientsS1)
        }
        return null
  })

  try {
    await mongoose.connect(
      "mongodb+srv://zawarbashir321:HXsjqdhHnYJOeO0u@farishta.ufyzebb.mongodb.net/test"
      // "mongodb://localhost:27017/agency"
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    var store = new MongoDBStore({
      uri: "mongodb+srv://zawarbashir321:HXsjqdhHnYJOeO0u@farishta.ufyzebb.mongodb.net/sessions",
      collection: 'mySessions'
    });
    
    // Catch errors
    store.on('error', function(error) {
      console.log(error);
    });
    
    app.use(session({
      secret: 'This is a secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true
    }));
    
    const adminOptions = {
      // We pass Category to `resources`
      assets: {
        styles: ["/boot.css","/sidebar.css"],
    },
      branding: {
        companyName: 'Farishta Enterprise',
        logo:'https://imgbox.io/ib/4JGEklMIgL.jpg',
        // logo: <img src="Compnents/assets/logo.jpg" alt="logo" />,
        withMadeWithLove:false,
        softwareBrothers:false,
      },
      pages: {

      },
      dashboard:{
        component:Components.Dashboard,
        handler:dashboardHandler,
      },
      resources: [
        clientResource,
       
        {
          resource:  Employees,
          options:{
            actions:{
              PdfGen: {
                actionType: 'record',
                icon: 'GeneratePdf',
                component: Components.PdfGen,
                handler: (request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfGenerator(record.toJSON(currentAdmin),'employees')
                    }
                }
            },
              new: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              bulkDelete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
              show: {
                after: async (response) => {
                  response.record.params.password = '';
                  return response;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
            }
          }
        },
        {
          resource:  Agent,
          options:{
            actions:{
              PdfGen: {
                actionType: 'record',
                icon: 'GeneratePdf',
                component: Components.PdfGen,
                handler: (request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfGenerator(record.toJSON(currentAdmin),'agent')
                    }
                }
            },
              new: {
               
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              bulkDelete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
              show: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
            }
          }
        },
       
        {
          resource:  Employers,
          options:{
            actions:{
              PdfGen: {
                actionType: 'record',
                icon: 'GeneratePdf',
                component: Components.PdfGen,
                handler: (request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfGenerator(record.toJSON(currentAdmin),'employers')
                    }
                }
            },
              new: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              bulkDelete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
              show: {
                after: async (response) => {
                  response.record.params.password = '';
                  return response;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
            }
          }
        },
        {
          resource:  Expense,
          options:{
            properties:{
              expenseTotal:{
                type:'String',
                components:{
                  show:Components.ExpenseTotal,
                  list:Components.ExpenseTotal,
                }
              }
            },
            actions:{
              PdfGen: {
                actionType: 'record',
                icon: 'GeneratePdf',
                component: Components.PdfGen,
                handler: (request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfGenerator(record.toJSON(currentAdmin),'expense')
                    }
                }
            },
              new: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              bulkDelete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
              show: {
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'|| currentAdmin.role ==='editor',
              },
            }
          }
        },
        {
          resource: Income,
          options:{
            properties:{
              incomeTotal:{
                type:'String',
                components:{
                  show:Components.IncomeTotal,
                  list:Components.IncomeTotal,
                }
              }
            },
            actions:{
              PdfGen: {
                actionType: 'record',
                icon: 'GeneratePdf',
                component: Components.PdfGen,
                handler: (request, response, context) => {
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        url: pdfGenerator(record.toJSON(currentAdmin),'income')
                    }
                }
            },
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
            }
          }
        },
      
        
     {
        resource: Users,
        options: {
          actions: {
            new: {
              before: async (request) => {
                if (request.payload?.password) {
                  request.payload.password = (request.payload.password);
                }
                return request;
              },
            },
            show: {
              after: async (response) => {
                response.record.params.password = '';
                return response;
              },
              isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
            },
            edit: {
              before: async (request) => {
                // no need to  on GET requests, we'll remove passwords there anyway
                if (request.method === 'post') {
                  //  only if password is present, delete otherwise
                  // so we don't overwrite it
                  if (request.payload?.password) {
                    request.payload.password = (request.payload.password);
                  } else {
                    delete request.payload?.password;
                  }
                }
                return request;
              },
              after: async (response) => {
                response.record.params.password = '';
                return response;
              },
            },
            list: {
              after: async (response) => {
                response.records.forEach((record) => {
                  record.params.password = '';
                });
                return response;
              },
              isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' ,
            },
            delete:{
              isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'
            },
            bulkDelete:{
              isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
            },
            },
          properties: {
            password: {
              isVisible: {
                list: false,
                filter: false,
                show: false,
                edit: true, // we only show it in the edit view
              },
            },
          },
        },
      },
      files,
    ],
    // Code for PDF generation
  //   const : orderResource = {
  //     resource: Order,
  //     options: {
  //         actions: {
  //             PDFGenerator: {
  //                 actionType: 'record',
  //                 icon: 'GeneratePdf',
  //                 component: Components.PDFGenerator,
  //                 handler: (request, response, context) => {
  //                     const { record, currentAdmin } = context
  //                     return {
  //                         record: record.toJSON(currentAdmin),
  //                         url: pdfgenerator(record.toJSON(currentAdmin))
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // },
    componentLoader
    }
    const admin = new AdminJS(adminOptions)

    admin.watch()
    
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
        {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
      },
      null,
      {
        store: store,
        resave: true,
        saveUninitialized: true,
        secret: 'sessionsecret',
        cookie: {
          httpOnly: process.env.NODE_ENV === 'production',
          secure: process.env.NODE_ENV === 'production',
        },
        name: 'adminjs',
      }
      )
    // const adminRouter = AdminJSExpress.buildRouter(admin)
      app.use(admin.options.rootPath, adminRouter)
      app.use(express.static(path.join(__dirname, "public")));
      app.use(express.static(path.join(__dirname, "pdfs")));

      app.get('/',(req,res)=>{
        return res.send('Working');
      })
      
      app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
      })
    }
    
    start()