const mongoose = require('mongoose')
const zoneSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Emri i zonës është i zbrazët'],
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



const Zone = mongoose.model('Zone', zoneSchema)

module.exports = Zone
