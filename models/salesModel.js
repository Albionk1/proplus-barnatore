const mongoose = require('mongoose')
const salesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      },
    client: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: [function () {
          return this.category_sell === 'many'
        }, 'Klienti është i zbrazët'],
      },
      category_sell: {
        type: String,
        required: [true, 'Kategoria e shitjes është e zbrazët'],
        enum:{
            values: ['few','many'],
            message: `Zgjedh tipin e shitjes`,
          },
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
      type: mongoose.Schema.Types.ObjectId,
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
      return this.isOpen === false
      },
      'Statusi i pagesës është i zbrazët'
            ],
           },
      sale_status:{
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
            ]
          },
      colon: {
                type: String,
                required: [
                    function () {
                      return this.category_sell === 'few'
                    },
                    'Totali i qmimit  është i zbrazët',
                  ],
                enum:{
                    values: ['col_1','col_2','col_3','col_4','col_5',''],
                    message: `Zgjedh tipin e shitjes`,
                  },
                },
           
           isOpen: {
            type: Boolean,
            default: true
          },
          payment_type:{
            type: String,
            required: [
            function () {
            return this.category_sell === 'few' && this.isOpen===false
            },
            'Lloji i pagesës është i zbrazët'
                  ],
                  enum:{
                    values: ['cash','bank'],
                    message: `Lloji i pagesës është i zbrazët`,
                  },
                 },
          bank:{
            type: String,
            required: [
            function () {
            return this.payment_type === 'bank'
            },
            'Lloji i bankës është i zbrazët'
                  ],
                  enum:{
                    values: ['Teb','Raiffaisen','BKT','NLB','Pro Credit',''],
                    message: `Lloji i bankës është i zbrazët`,
                  },
                 },
          cashier: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: [
              function () {
                return this.category_sell === 'few'
              },
              'Arkatari është i zbrazët',
            ],
            },
      cardUser:{
          type: mongoose.Schema.Types.ObjectId, ref: 'LoyaltyCard',
      },
      arc: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Arc',
        required: [ function () {
          return this.isOpen === false
        }, 'Arka është e zbrazët'],
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



const Sales = mongoose.model('Sales', salesSchema)

module.exports = Sales
