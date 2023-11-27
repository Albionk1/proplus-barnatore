const mongoose = require('mongoose')
const manufacturerSchema = new mongoose.Schema(
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



const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema)

module.exports = Manufacturer
