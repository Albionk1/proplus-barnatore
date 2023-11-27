
const mongoose = require('mongoose')
const transferCalcSchema = new mongoose.Schema(
  {
    transfer:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Transfer'
    },
    unit:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Unit'
  },
    qty: {
        type: Number,
        required: [true, 'Sasia është e zbrazët'],
         },
    barcode:{
         type: String,
         required: [true, 'Barkodi është i zbrazët'],
       },
       article:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article',
        required: [true, 'Zgjedh artikullin për aksionit'],
      },
    deleted: {
      type: Boolean,
      default: false
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



const TransferCalc = mongoose.model('TransferCalc', transferCalcSchema)

module.exports = TransferCalc
