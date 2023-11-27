const mongoose = require('mongoose')
const transferSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      },
         transfer_type: {
            type: String,
            enum:{
               values: ['request','transfer'],
               message: `Zgjedh tipin e tranferit`,
             },
            required: [true, 'Tipi i shitjes është i zbrazët'],
            },
            date: {
               type: String,
               required: [true, 'Zgjedh daten'],
               },
               comment: {
                type: String,
                },
                comment_rejected: {
                  type: String,
                  },
            unit: {
              type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
            required: [true, 'Zgjedh njesin'],
             },
             unit_for: {
              type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
            required: [true, 'Zgjedh njesin'],
             },
            //  unitRequested: {
            //   type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
            // required: [true, 'Zgjedh njesin'],
            //  },
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
           isOpen: {
            type: Boolean,
            default: true
          },
          status: {
            type: String,
            enum:{
               values: ['waiting','completed','rejected'],
               message: `Zgjedh statusin e tranferit`,
             },
            required: [ function () {
              return this.isOpen === false
            },, 'Tipi i shitjes është i zbrazët'],
            },
            incializer_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            response_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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



const Transfer = mongoose.model('Transfer', transferSchema)

module.exports = Transfer
