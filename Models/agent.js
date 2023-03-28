import mongoose from 'mongoose'


const AgentSchema = new mongoose.Schema(
  {
      name: { type: 'String',  },
      agency_name: { type: 'String',  },
      address: { type: 'String',  },
      contact: { type: 'String',  },
      email: { type: 'string',  },
      

  }
  // {
  // },
  // { timestamps: true },
)

  export const Agent = mongoose.model('Agent', AgentSchema);
  //  module.exports = { Agent };