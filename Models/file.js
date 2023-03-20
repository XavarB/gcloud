import mongoose from 'mongoose'


const FileSchema = new mongoose.Schema(
  {
      name: { type: 'String',  },
      id: { type: 'Number',  },
      bucket: { type: 'String',  },
      mime: { type: 'String',  },
      comment: { type: 'string'| null,  },
      path:{type: 'string' | null},
      

  }
  // {
  // },
  // { timestamps: true },
)

  export const File = mongoose.model('File', FileSchema);
 