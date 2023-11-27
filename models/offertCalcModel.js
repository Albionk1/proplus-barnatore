
const mongoose = require('mongoose')
const offertCalcSchema = new mongoose.Schema(
  {
    offert:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Offert'
    },
    unit:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Unit'
  },
    qty: {
        type: Number,
        required: [true, 'Sasia është e zbrazët'],
         },
     rab_1: {
        type: Number,
         required: [true, 'Rabati i parë është i zbrazët'],
        },
     rab_2: {
        type: Number,
        required: [true, 'Rabati i dytë është i zbrazët'],
        },
        discount: {
            type: Number,
           required: [true, 'Zbritja  është e zbrazët'],
              },
    barcode:{
         type: String,
         required: [true, 'Barkodi është i zbrazët'],
       },
       article:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article',
        required: [true, 'Zgjedh artikullin për aksionit'],
      },
      price_many: {
        type: Number,
        required: [true, 'Qmimi i shumic është i zbrazët'],
              },
      total_price: {
        type: Number,
        required: [true, 'Vlera totale është e zbrazët'],
        },
    tvsh:{
    type:Number,
    required: [true, 'Tvsh është e zbrazët'],
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



const OffertCalc = mongoose.model('OffertCalc', offertCalcSchema)

module.exports = OffertCalc
