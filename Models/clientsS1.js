import mongoose from 'mongoose'
// import { files } from '../Resources/files.js';
// import { Expense } from './expense.js';
import { Income } from './income.js';


const ClientsS1Schema = new mongoose.Schema(
  {
    Name: { type: 'String', required:true },
    Address: { type: 'String', required:true},
    // photo: { type: 'String', },
    path: { type: 'String', },
    Contact: { type: 'String',required:true },
    Date_of_birth: { type: 'date', required:true},
    Passport_number: { type: 'string', },
    Passport_expiry_date: { type: 'date', },
    CNIC: { type: 'string', },
    Qualification: { type: 'String', },
    Trade_applied_for: { type: 'String', },
    Country_applied_for: { type: 'String', },
    Reffered_by_agent_or_agency_or_self: { type: 'String', },
    Years_of_local_experiance: { type: 'String', },
    Country_of_foreign_experiance: { type: 'String', },
    Years_of_foreign_experiance: { type: 'String', },
    Languages_english_urdu_arabic_etc: { type: 'String', },
    // ---------------
    // Medical_photograph: { type: 'object', },
    // Contract_photograph: { type: 'object', },
    Contract_submission_date: { type: 'String', },
    Total_payment: { type: 'String',  },
    Payment_paid: { type: 'String',  },
    Paymentpayable: { type: 'String',  },
    
    // -----------------
    
    Calling_date: { type: 'date', },
    Protector_date: { type: 'date', },
    Visa_status: { type: 'String', },
    Airline_ticket: { type: 'String', },
    Flying_date: { type: 'date', },
    // path:{type: 'string' | null},
    // // bucket: { type: 'String',  },
    // // mime: { type: 'String',  },
    
  
    income :  { type: mongoose.Schema.Types.ObjectId, ref: 'Income' },
    // expense :  { type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }, 
    files :  { type: mongoose.Schema.Types.ObjectId, ref: 'File' } ,
    agent :  { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' } ,
   
  
  }
  // {
  // },
  // { timestamps: true },
)

export const ClientsS1 = mongoose.model('ClientsS1', ClientsS1Schema);
// module.exports = { ClientsS1 };