const mongoose = require('mongoose')
const subGroupSchema = new mongoose.Schema(
  {group:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Group',
    required:[true,'Zgjedhni grupin']
  } 
    ,
    name: {
        type: String,
        required: [true, 'Emri i nën grupit është i zbrazët'],
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



const SubGroup = mongoose.model('SubGroup', subGroupSchema)

module.exports = SubGroup
