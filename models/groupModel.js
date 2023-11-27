const mongoose = require('mongoose')
const groupSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Emri i grupit është i zbrazët'],
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



const Group = mongoose.model('Group', groupSchema)

module.exports = Group
