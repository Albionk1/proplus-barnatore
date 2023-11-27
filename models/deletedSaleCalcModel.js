
const mongoose = require('mongoose')
const deleteSalesCalcSchema = new mongoose.Schema(
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
         cashier: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            },
            invoice: {
                type: String,
                required: [true, 'Numri i fatures është i zbrazët'],
                },
                arc: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'Arc',
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



const DeleteSalesCalc = mongoose.model('DeleteSalesCalc', deleteSalesCalcSchema)

module.exports = DeleteSalesCalc
