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
import  {ClientsS1} from './Models/clientsS1.js';
import  {Employees} from './Models/employees.js'
import  {Agent} from './Models/agent.js'
import  {Employers} from './Models/employers.js'

import  {Income} from './Models/income.js'
import  {Expense} from './Models/expense.js'
import {Users} from './Models/users.js'
import fileDirName from './file-dir-name.js'
import path from 'path'

const MongoDBStore = MongoDBSession(session)
const { ComponentLoader } = AdminJS

const componentLoader = new ComponentLoader()
const {__dirname,__filename} = fileDirName(import.meta)

const Components = {
  Dashboard: componentLoader.add('Dashboard', path.join(__dirname,'dashboard')),
  // other custom components
}


AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const PORT = process.env.PORT || 3890
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
  return { message: 'Hello World', users:allUsers, clients: allClientsS1, currentRole:currentAdmin.role }
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
      "mongodb://localhost:27017/agency"
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    var store = new MongoDBStore({
      uri: 'mongodb://localhost:27017/sessions',
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
        logo:'https://aakifraza.com/visuals/logo.svg',
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
        {
          resource:  ClientsS1,
          options:{
            actions:{
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor' || currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              bulkDelete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
          resource:  Employees,
          options:{
            actions:{
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
          resource:  Employers,
          options:{
            actions:{
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor'|| currentAdmin.role ==='guest',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
            actions:{
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
          resource: Income,
          options:{
            
            actions:{
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
                  }
                  return request;
                },
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin' || currentAdmin.role ==='editor',
              },
              list:{
                isAccessible:({currentAdmin})=>currentAdmin.role ==='admin'  || currentAdmin.role ==='editor',
              },
              delete:{
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin'
              },
              edit: {
                before: async (request) => {
                  // no need to hash on GET requests, we'll remove passwords there anyway
                  if (request.method === 'post') {
                    // hash only if password is present, delete otherwise
                    // so we don't overwrite it
                    if (request.payload?.password) {
                      request.payload.password = hash(request.payload.password);
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
                isAccessible: ({currentAdmin})=>currentAdmin.role ==='admin',
              },
              show: {
                after: async (response) => {
                  response.record.params.password = '';
                  return response;
                },
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
                  request.payload.password = hash(request.payload.password);
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
                // no need to hash on GET requests, we'll remove passwords there anyway
                if (request.method === 'post') {
                  // hash only if password is present, delete otherwise
                  // so we don't overwrite it
                  if (request.payload?.password) {
                    request.payload.password = hash(request.payload.password);
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
            }
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
    ],
    componentLoader
    }
    const admin = new AdminJS(adminOptions)
    // admin.overrideLogin({ component: Components.Dashboard })
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
      app.use(express.static(path.join(__dirname, "./public")));

      app.get('/',(req,res)=>{
        return res.send('Working');
      })
      
      app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
      })
    }
    
    start()