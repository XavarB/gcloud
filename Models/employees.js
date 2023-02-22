const mongoose  = require ('mongoose');


const EmployeesSchema = new mongoose.Schema(
  {
    
      name: { type: 'String', required: true },
      address: { type: 'String', required: true },
      photo:{type:'object',},
      contact: { type: 'string', required: true },
      email: { type: 'String', required: true },

  }
  // {
  // },
  // { timestamps: true },
)

   const Employees = mongoose.model('Employees', EmployeesSchema);
   module.exports = { Employees };