const mongoose = require('mongoose')
const actionCalcSchema = new mongoose.Schema(
  {
      action: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Action',
        required: [true, 'Aksioni është zbrazët'],
      },
      barcode:{
        type: String,
        required: [true, 'Barkodi është i zbrazët'],
      },
      article:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article',
        required: [true, 'Zgjedh artikullin për aksionit'],
      },
      price_now_few:{
        type:Number,
        required: [
          function () {
            return this.price_for === 'few'
          },
          'Qmimi i tanishëm është i zbrazët'
        ],
      },
      price_now_many:{
        type:Number,
        required: [
          function () {
            return this.price_for === 'many'
          },
          'Qmimi i tanishëm është i zbrazët'
        ],
      },
      price_action_few:{
        type:Number,
        required: [
          function () {
            return this.price_for === 'few'
          },
          'Qmimi në aksion është i zbrazët'
        ],
      },
      price_action_many:{
        type:Number,
        required: [
          function () {
            return this.price_for === 'many'
          },
          'Qmimi në aksion është i zbrazët'
        ],
      },
      percent:{
        type:Number,
        required:[true,'Përqindja është e zbrazët']
      },
      price_for: {
        type: String,
        enum:{
          values: ['few','many'],
          message: `Zgjedh parametrin e qmimit`,
        },
        required: [true, 'Aksioni duhet te takoj nje tipi']
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



const ActionCalc = mongoose.model('ActionCalc', actionCalcSchema)

module.exports = ActionCalc
