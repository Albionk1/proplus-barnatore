const mongoose = require('mongoose')
const expenseCategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Emri i zonës është i zbrazët'],
      },
      unit: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
        required: [true, 'Njesia është e zbrazët'],
      },
      user: {
        type: String,
        required: [true, 'Emri i personit që e shtoi kategorin është i zbrazët'],
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



const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema)

module.exports = ExpenseCategory
