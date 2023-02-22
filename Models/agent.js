const mongoose  = require ('mongoose');


const AgentSchema = new mongoose.Schema(
  {
      name: { type: 'String',  },
      agency_name: { type: 'String',  },
      address: { type: 'String',  },
      contact: { type: Number,  },
      email: { type: 'string',  },
      

  }
  // {
  // },
  // { timestamps: true },
)

   const Agent = mongoose.model('Agent', AgentSchema);
   module.exports = { Agent };