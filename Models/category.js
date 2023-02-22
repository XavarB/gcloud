const mongoose  = require ('mongoose');


const CategorySchema = new mongoose.Schema(
  {
      title: { type: 'String', required: true },
      description: { type: 'String', required: true },
      comment: { type: 'String', required: true },
      mobile: { type: Number, required: true },

  }
  // {
  // },
  // { timestamps: true },
)

   const Category = mongoose.model('Category', CategorySchema);
   module.exports = { Category };