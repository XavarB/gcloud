import mongoose from 'mongoose'
// import { ClientsS1 } from './clientsS1.js';

const ExpenseSchema = new mongoose.Schema(
  {
    Name: { type: 'String', required:true },
    Medical_expenses: { type: Number,  },
    // Pakistan
    Pakistan_Office_exp: { type: Number,  },
    Pakistan_Sal: { type: Number,  },
    Pakistan_Gov_fee: { type: Number,  },
    Pakistan_Comission: { type: Number,  },
    Others_Pakistan_exp: { type: Number,  },
    // Malaysia
    Malaysia_Office_exp: { type: Number,  },
    Malaysia_sal: { type: Number,  },
    Malaysia_Gov_fee: { type: Number,  },
    Malaysia_Comission: { type: Number,  },
    Others_Malaysia_exp: { type: Number,  },
    // client: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ClientsS1"
    // }
  
  
  
  
  }
  // {
  // },
  // { timestamps: true },
)

export const Expense = mongoose.model('Expense', ExpenseSchema);
// module.exports = { Expense };