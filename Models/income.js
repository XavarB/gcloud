import mongoose from 'mongoose'
import { ClientsS1 } from './clientsS1.js';


const IncomeSchema = new mongoose.Schema(
  {
    Name: { type: 'String', required:true },
    Client_income: { type: 'String',  },
    Agent_or_Agency_income: { type: 'String',  },
    Employer_income: { type: 'String',  },
    other_Incomes: { type: 'String',  },
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