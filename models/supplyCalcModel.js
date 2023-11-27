
const mongoose = require('mongoose')
const supplyCalcSchema = new mongoose.Schema(
  {
    supply:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Supply'
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
     price: {
     type: Number,
     required: [true, 'Qmimi i zbrazët është i zbrazët'],
           },
        mazh: {
            type: Number,
           required: [true, 'Mazh është i zbrazët'],
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
      price_few: {
      type: Number,
      required: [true, 'Qmimi i pakic është i zbrazët'],
      },
      total_price: {
        type: Number,
        required: [true, 'Vlera totale është e zbrazët'],
        },
    deleted: {
      type: Boolean,
      default: false
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



const SupplyCalc = mongoose.model('SupplyCalc', supplyCalcSchema)

module.exports = SupplyCalc
