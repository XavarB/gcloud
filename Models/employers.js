import mongoose from 'mongoose'


const EmployersSchema = new mongoose.Schema(
  {
    name: { type: 'String', required: true },
    designation: { type: 'String', required: true },
    company_name: { type: 'String',  },
    address: { type: 'String',  },
    contact: { type: 'string', required: true },
    email: { type: 'String', required: true },
    no_of_employees: { type: Number,  },
    trade: { type: 'string', required: true },
    contract_date: { type: 'date',  },
    demand_ltr: { type: 'object',  },
    development_date: { type: 'date',  },
    payment_ttl: { type: 'String',  },
    payment_pyd: { type: 'String',  },
    payment_lft: { type: 'String',  },
  }
  // {
  // },
  // { timestamps: true },
)

   export const Employers = mongoose.model('Employers', EmployersSchema);
  //  module.exports = { Employers };
   