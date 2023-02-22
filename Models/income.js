const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema(
  {
    
    client_inc: { type: Number,  },
    agent_agency_inc: { type: Number,  },
    employer_inc: { type: Number,  },
    medical_exp: { type: Number,  },
    others: { type: Number,  },
   
  
  
  
  
  }
  // {
  // },
  // { timestamps: true },
)

const Income = mongoose.model('Income', IncomeSchema);
module.exports = { Income };