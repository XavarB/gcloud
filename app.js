const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')
const mongoose = require ('mongoose')
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var cors = require('cors')

const  AdminJSMongoose = require('@adminjs/mongoose');
const  {Category} =  require('./Models/category')
const  {ClientsS1} =  require('./Models/clientsS1')
const  {ClientsS2} =  require('./Models/clientsS2')
const  {ClientsS3} =  require('./Models/clientsS3')
const  {Employees} =  require('./Models/employees')
const  {Agent} =  require('./Models/agent')
const  {Employers} =  require('./Models/employers')
const  {EmployersForm2} =  require('./Models/employersForm2')
const  {Income} =  require('./Models/income')
const  {Expense} =  require('./Models/expense')



AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const PORT = 3008
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

// const authenticate = async (email, password) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN)
//   }
//   return null
// }

const start = async () => {
  const app = express()
  app.use(cors())

  try {
    await mongoose.connect(
      "mongodb+srv://zawarbashir321:HXsjqdhHnYJOeO0u@farishta.ufyzebb.mongodb.net/test"
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    // var store = new MongoDBStore({
    //   uri: 'mongodb://localhost:27017/sessions',
    //   collection: 'mySessions'
    // });
    
    // // Catch errors
    // store.on('error', function(error) {
    //   console.log(error);
    // });
    
    // app.use(require('express-session')({
    //   secret: 'This is a secret',
    //   cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    //   },
    //   store: store,
    //   // Boilerplate options, see:
    //   // * https://www.npmjs.com/package/express-session#resave
    //   // * https://www.npmjs.com/package/express-session#saveuninitialized
    //   resave: true,
    //   saveUninitialized: true
    // }));
    
    const adminOptions = {
      // We pass Category to `resources`
      
      resources: [ClientsS1,ClientsS2,ClientsS3,Category,Employees,Employers,EmployersForm2,Income,Expense,{
        resource:Agent,
        options:{
          properties:{
            Name:{
              type:'textarea'
            }
          }
        }
      }],
    }
    
    const admin = new AdminJS(adminOptions)
    
    // const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    //   admin,
    //   {
    //     authenticate,
    //     cookieName: 'adminjs',
    //     cookiePassword: 'sessionsecret',
    //   },
    //   null,
    //   {
    //     store: store,
    //     resave: true,
    //     saveUninitialized: true,
    //     secret: 'sessionsecret',
    //     cookie: {
    //       httpOnly: process.env.NODE_ENV === 'production',
    //       secure: process.env.NODE_ENV === 'production',
    //     },
    //     name: 'adminjs',
    //   }
    //   )
    const adminRouter = AdminJSExpress.buildRouter(admin)
      app.use(admin.options.rootPath, adminRouter)

      app.get('/',(req,res)=>{
        return res.send('Working');
      })
      
      app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
      })
    }
    
    start()