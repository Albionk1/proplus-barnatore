const mongoose = require('mongoose')
const actionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    start_time: {
        type: Date,
        required: [true, 'Data e startimit të aksionit është e zbrazët'],
      },
      end_time: {
        type: Date,
        required: [true, 'Data e mbarimit të aksionit është e zbrazët'],
      },
      unit: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
        required: [true, 'Njesia është zbrazët'],
      },
      beneficiaries: {
        type: String,
        enum:{
          values: ['all','card'],
          message: `Zgjedh parametrin e shitjes`,
        },
        required: [true, 'Zgjedh përfituesit e aksionit'],
      },
      price_total:{
        type:Number
      },
      price_action:{
       type:Number
      },
      percent:{
       type:Number
      },
      active: {
        type: Boolean,
        default: false
      },
      nr_articles:{
        type:Number
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



const Action = mongoose.model('Action', actionSchema)

module.exports = Action
