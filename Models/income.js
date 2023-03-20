import mongoose from 'mongoose'
import { ClientsS1 } from './clientsS1.js';


const IncomeSchema = new mongoose.Schema(
  {
    Name: { type: 'String', required:true },
    Client_income: { type: Number,  },
    Agent_or_Agency_income: { type: Number,  },
    Employer_income: { type: Number,  },
    other_Incomes: { type: Number,  },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientsS1"
    }
  }
  // {
  // },
  // { timestamps: true },
)

export const  Income = mongoose.model('Income', IncomeSchema);
// module.exports = { Income };