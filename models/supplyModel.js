const mongoose = require('mongoose')
const supplySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      },
    supplier: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Supplier',
        required: [true, 'Furnitori është i zbrazët'],
      },
      invoice: {
         type: String,
         required: [true, 'Numri i fatures është i zbrazët'],
         },
         buy_type: {
            type: String,
            enum:{
               values: ['vendore','damaged_supply','returned_supply','expense_supply','count','exchange'],
               message: `Zgjedh tipin e shitjes`,
             },
            required: [true, 'Tipi i shitjes është i zbrazët'],
            },
            date: {
               type: String,
               required: [true, 'Zgjedh daten'],
               },
            unit: {
               type: mongoose.Schema.Types.ObjectId, ref: 'Unit', 
            required: [true, 'Zgjedh njesin'],
             },
             
          for_sale: {
          type: Boolean,
          default: false
           },
           paid_status:{
            type: Boolean,
            required: [
              function () {
                return this.isOpen === false &&this.buy_type !=='count' &&this.buy_type !=='exchange'
              },
              'Statusi i pagesës është i zbrazët'
            ],
           },
           supply_status:{
            type: Boolean,
            required: [
              function () {
                return this.isOpen === false &&this.buy_type !=='count' &&this.buy_type !=='exchange'
              },
              'Statusi i furnizimit është i zbrazët',
            ],
           },
           nr_producs:{
            type: Number,
            required: [
              function () {
                return this.isOpen === false &&this.buy_type !=='count'
              },
              'Numri i produkteve  është i zbrazët',
            ],
           },
           total_price:{
            type: Number,
            required: [
              function () {
                return this.isOpen === false &&this.buy_type !=='count'
              },
              'Totali i qmimit  është i zbrazët',
            ],
           },
           isOpen: {
            type: Boolean,
            default: true
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



const Supply = mongoose.model('Supply', supplySchema)

module.exports = Supply
