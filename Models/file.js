import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  path: { type: String },
  mimeType: String,
  size: Number,
  filename: String,
  bucket: String,
});

const FileSchema = new mongoose.Schema(
  {
      name: { type: 'String',  },
      id: { type: 'Number',  },
      bucket: { type: 'String',  },
      mime: { type: 'String',  },
      comment: { type: 'string'| null,  },
      filePath:{type:'Array'| null},
      path:{type: 'Array' | null},
      // media: {
      //   big: mediaSchema,
      //   small: mediaSchema
      // },

  }
  // {
  // },
  // { timestamps: true },
)

  export const File = mongoose.model('File', FileSchema);
 