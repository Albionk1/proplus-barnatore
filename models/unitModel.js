const mongoose = require('mongoose')
const unitSchema = new mongoose.Schema(
  {
    token:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Authorization',
      required: [true, 'Autorizimi është i zbrazët'],
    },
    unit_name: {
        type: String,
        required: [true, 'Emri i biznesit është i zbrazët'],
      },
    address: {
        type: String,
        required: [true, 'Adresa është e zbrazët'],
      },
    // category: {
    //     type: String,
    //     enum:{
    //       values: ["company", "unit"],
    //       message: `Zgjedh pozicionin në kompani`,
    //     },
    //     required: [true, 'Kategoria është e zbrazët'],
    //   },
      status:{
       type:Boolean,
       default:false,
       required: [true, 'Statusi është i zbrazët'],
      },
      company:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Company'
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



const Unit = mongoose.model('Unit', unitSchema)

module.exports = Unit
