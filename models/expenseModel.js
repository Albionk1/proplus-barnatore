const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema(
  {
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory',
        required: [true, 'Emri i kategoris është i zbrazët'],
      },
      category_name:{
        type:String
      },
      amount: {
        type: Number,
        min:[0,'Shpenzimi nuk mund të jetë më i vogël se 0'],
        required: [true, 'Shuma e shpenzimit e zbrazët'],
      },
      unit: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
        required: [true, 'Njesia është e zbrazët'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'Emri i personit që e shtoi shpenzimin është i zbrazët'],
      },
      arc: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Arc',
        required: [true, 'Arka është e zbrazët'],
      },
      comment: {
        type: String,
      },
      date: { type: Date, default: Date.now },
      isOpen:{
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



const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
