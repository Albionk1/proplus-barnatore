const mongoose = require('mongoose')
const arcSchema = new mongoose.Schema(
  {
    startCount: {
        type: Number,
        required: [true, 'Startimi i arkës është i zbrazët'],
        min:[0,'Sasia minimale e startitmit të arkës është 0']
      },
    seller: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
     required: [true, 'Id e shitsit është e zbrazët'],
      },
    unit: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
    required: [true, 'Njesia është e zbrazët'],
        },
    date:{
      type: Date,
    required: [true, 'Data është e zbrazët'],
       default: Date.now
    },
    isOpen:{
    type:Boolean,
    default:true
    },
    closeCount: {
      type: Number,
      required: [ function () {
        return this.isOpen === false
        }, 'Mbyllja e arkës është e zbrazët'],
    },
    debt: {
      type: Number,
      required: [ function () {
        return this.isOpen === false
        }, 'Minusi i puntorit është i zbrazët'],
    },
    count: {
      type: Number,
      required: [ function () {
        return this.isOpen === false
        }, 'Mbyllja e arkës është e zbrazët'],
    },
    comment: {
      type: String,
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



const Arc = mongoose.model('Arc', arcSchema)

module.exports = Arc
