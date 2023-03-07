import mongoose from 'mongoose'


const ExpenseSchema = new mongoose.Schema(
  {
    name: { type: 'String', required:true },
    // Pakistan
    office_exp_p: { type: Number,  },
    salaries_p: { type: Number,  },
    gov_fee_p: { type: Number,  },
    comission_p: { type: Number,  },
    others_p: { type: Number,  },
    // Malaysia
    office_exp_m: { type: Number,  },
    salaries_m: { type: Number,  },
    gov_fee_m: { type: Number,  },
    comission_m: { type: Number,  },
    others_m: { type: Number,  },
  
  
  
  
  }
  // {
  // },
  // { timestamps: true },
)

export const Expense = mongoose.model('Expense', ExpenseSchema);
// module.exports = { Expense };