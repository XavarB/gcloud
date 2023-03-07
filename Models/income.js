import mongoose from 'mongoose'


const IncomeSchema = new mongoose.Schema(
  {
    name: { type: 'String', required:true },
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

export const  Income = mongoose.model('Income', IncomeSchema);
// module.exports = { Income };