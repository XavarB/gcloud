import mongoose from 'mongoose'


const ClientsS1Schema = new mongoose.Schema(
  {
    name: { type: 'String', required:true },
    address: { type: 'String', required:true},
    photo: { type: 'object', },
    contact: { type: 'String',required:true },
    dob: { type: 'date', required:true},
    passport_no: { type: 'string', },
    passport_exp_date: { type: 'date', },
    cnic: { type: Number, },
    qualification: { type: 'String', },
    trade_applied: { type: 'String', },
    country_applied: { type: 'String', },
    reference: { type: 'String', },
    local_exp_yrs: { type: Number, },
    foreign_exp_country: { type: 'String', },
    foreign_exp_yrs: { type: Number, },
    languages: { type: 'String', },
    // ---------------
    med_photo: { type: 'object', },
    contract_photo: { type: 'object', },
    contract_sub_date: { type: 'date', },
    payment_ttl: { type: Number,  },
    payment_pyd: { type: Number,  },
    payment_lft: { type: Number,  },
    
    // -----------------
    
    calling_date: { type: 'date', },
    protector_date: { type: 'date', },
    visa_status: { type: 'String', },
    airline_ticket: { type: 'String', },
    flying_date: { type: 'date', },
    
  
  
  
  
  }
  // {
  // },
  // { timestamps: true },
)

export const ClientsS1 = mongoose.model('ClientsS1', ClientsS1Schema);
// module.exports = { ClientsS1 };