const mongoose = require('mongoose')
const offertSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      },
    client: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: [true, 'Klienti është i zbrazët'],
      },
      invoice: {
         type: String,
         required: [true, 'Numri i fatures është i zbrazët'],
         },
         sell_type: {
            type: String,
            enum:{
               values: ['sell','export'],
               message: `Zgjedh tipin e shitjes`,
             },
            required: [true, 'Tipi i shitjes është i zbrazët'],
            },
            date: {
               type: String,
               required: [true, 'Zgjedh daten'],
               },
            unit: {
            type: String,
            required: [true, 'Zgjedh njesin'],
             },
             
          for_sale: {
          type: Boolean,
          default: false
           },
           supply_status:{
            type: Boolean,
            required: [
              function () {
                return this.isOpen === false
              },
              'Statusi i furnizimit është i zbrazët',
            ],
           },
           nr_producs:{
            type: Number,
            required: [
              function () {
                return this.isOpen === false
              },
              'Numri i produkteve  është i zbrazët',
            ],
           },
           total_price:{
            type: Number,
            required: [
              function () {
                return this.isOpen === false
              },
              'Totali i qmimit  është i zbrazët',
            ],
           },
           total_price_Without_Discount:{
            type: Number,
            required: [
              function () {
                return this.isOpen === false
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



const Offert = mongoose.model('Offert', offertSchema)

module.exports = Offert
