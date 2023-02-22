const mongoose = require('mongoose');


const ClientsS2Schema = new mongoose.Schema(
  {
    // name: { type: 'String', },
    // address: { type: 'String', },
    // photo: { type: 'object', },
    // contact: { type: 'String', },
    // dob: { type: 'date', },
    // passport_no: { type: 'string', },
    // passport_exp_date: { type: 'date', },
    // cnic: { type: Number, },
    // qualification: { type: 'String', },
    // trade_applied: { type: 'String', },
    // country_applied: { type: 'String', },
    // reference: { type: 'String', },
    // local_exp_yrs: { type: Number, },
    // foreign_exp_country: { type: 'String', },
    // foreign_exp_yrs: { type: Number, },
    // languages: { type: 'String', },
    // ---------------
    med_photo: { type: 'object', },
    contract_photo: { type: 'object', },
    contract_sub_date: { type: 'date', },
    payment_ttl: { type: Number,  },
    payment_pyd: { type: Number,  },
    payment_lft: { type: Number,  },
    
    // -----------------
    
    // calling_date: { type: 'date', },
    // protector_date: { type: 'date', },
    // visa_status: { type: 'String', },
    // airline_ticket: { type: 'String', },
    // flying_date: { type: 'date', },
    
  
  
  
  
  }
  // {
  // },
  // { timestamps: true },
)

const ClientsS2 = mongoose.model('ClientsS2', ClientsS2Schema);
module.exports = { ClientsS2 };