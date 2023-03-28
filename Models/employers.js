import mongoose from 'mongoose'


const EmployersSchema = new mongoose.Schema(
  {
    name: { type: 'String', required: true },
    designation: { type: 'String', required: true },
    company_name: { type: 'String',  },
    address: { type: 'String',  },
    contact: { type: 'string', required: true },
    email: { type: 'String', required: true },
    no_of_employees: { type: 'String',  },
    trade: { type: 'string', required: true },
    contract_date: { type: 'date',  },
    demand_ltr: { type: 'String',  },
    development_date: { type: 'date',  },
    Total_payment: { type: 'String',  },
    Payment_paid: { type: 'String',  },
    Payment_balance: { type: 'String',  },
  }
  // {
  // },
  // { timestamps: true },
)

   export const Employers = mongoose.model('Employers', EmployersSchema);
  //  module.exports = { Employers };
   