import mongoose from 'mongoose'


const UsersSchema = new mongoose.Schema(
  {
    
      id: { type: 'String', required: true },
      email: { type: 'String', required: true },
      role: { type: 'String', required: true },
      password:{type:'object',},

  }
  // {
  // },
  // { timestamps: true },
)

   export const Users = mongoose.model('Users', UsersSchema);