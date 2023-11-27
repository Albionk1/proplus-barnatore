
const mongoose = require('mongoose')
const SalesCalcSchema = new mongoose.Schema(
  {
    category_sell: {
      type: String,
      required: [true, 'Kategoria e shitjes është e zbrazët'],
      enum:{
          values: ['few','many'],
          message: `Zgjedh tipin e shitjes`,
        },
      },
    sale:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Sales'
    },
    qty: {
        type: Number,
        required: [true, 'Sasia është e zbrazët'],
         },
     rab_1: {
        type: Number,
        required: [function () {
          return this.category_sell === 'many'
        }, 'Rabati i parë është i zbrazët'],
        },
     rab_2: {
        type: Number,
        required: [function () {
          return this.category_sell === 'many'
        }, 'Rabati i dytë është i zbrazët'],
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
      price_few: {
        type: Number,
        required: [
          function () {
          return this.category_sell === 'few'
          },
          'Qmimi i pakic është i zbrazët'
                ],
              },
      price_many: {
        type: Number,
        required: [
          function () {
          return this.category_sell === 'many'
          },
          'Qmimi i shumic është i zbrazët'
                ],
              },
      total_price: {
        type: Number,
        required: [true, 'Vlera totale është e zbrazët'],
        },
        tvsh:{
         type:Number,
         required: [true, 'Tvsh është e zbrazët'],
        },
        paid_status:{
          type: Boolean,
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



const SalesCalc = mongoose.model('SalesCalc', SalesCalcSchema)

module.exports = SalesCalc
