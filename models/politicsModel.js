const mongoose = require('mongoose')
const politicsSchema = new mongoose.Schema(
  {
    keyboard:{
       type:Boolean,
       default:false,
       required: [true, 'Zgjedh për pordorim të keybord'],

    },
    unit: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
        required: [true, 'Zgjedh njesin'],
      },
    message_few: {
        type: String,
        required: [true, 'Mesazhi në pakic është i zbrazët'],
      },
      message_many: {
        type: String,
        required: [true, 'Mesazhi në shumic është i zbrazët'],
      },
    sales_minus: {
        type: Boolean,
        default:false,
        required: [true, 'Shitjet me minus janë të zbrazëta'],
      },
      printer:{
        type: String,
        required: [true, 'Printeri është i zbrazët'],
      },
      message_bill:{
        type: String,
        required: [true, 'Mesazhi në faturn është i zbrazët'],
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



const Politics = mongoose.model('Politics', politicsSchema)

module.exports = Politics
