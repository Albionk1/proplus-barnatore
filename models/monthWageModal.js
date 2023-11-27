const mongoose = require('mongoose')
const monthSchema = new mongoose.Schema(
  {
    month: {
        type: String,
        enum:{
            values: ['january','february',"march","april","may","june","july","august","september","october","november","december",""],
            message: `Muaji është i zbrazët`,
          },
        required: [true, 'Muaji është i zbrazët'],
      },
      year: {
        type: String,
        required: [true, 'Viti është i zbrazët'],
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



const Month = mongoose.model('Month', monthSchema)

module.exports = Month
