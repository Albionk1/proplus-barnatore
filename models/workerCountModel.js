
const mongoose = require('mongoose')
const workerCountSchema = new mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    qty: {
        type: Number,
        required: [true, 'Sasia është e zbrazët'],
         },
         article_name:{
          type: String
        },
  article:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article',
        required: [true, 'Zgjedh artikullin për aksionit'],
      },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Zgjedh njesin'],
      }, 
      isOpen:{
      type:Boolean,
      default:true
      },
    activity:[
      {
        action:String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
      ]
  },
  {
    timestamps: true,
  }
)



const WorkerCount = mongoose.model('WorkerCount', workerCountSchema)

module.exports = WorkerCount
