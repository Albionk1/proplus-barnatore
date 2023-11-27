const mongoose = require('mongoose')
const categoryOutcomeSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Emri i zonës është i zbrazët'],
      },
  type: {
  type: String,
  enum:{
    values: ['outcome','strategic_investment'],
    message: `Zgjedh parametrin e tipit kategoris`,
  },
   required: [true, 'Tipi i kategoris është i zbrazët'],
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



const CategoryOutcome = mongoose.model('CategoryOutcome', categoryOutcomeSchema)

module.exports = CategoryOutcome
