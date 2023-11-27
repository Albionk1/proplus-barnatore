const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Emri i biznesit është i zbrazët'],
      },
      arbk: {
        type: String,
        required: [true, 'Numri i biznesit është i zbrazët'],
      },
      address: {
        type: String,
        required: [true, 'Numri i biznesit është i zbrazët'],
      },
      address: {
        type: String,
        required: [true, 'Numri i biznesit është i zbrazët'],
      },
      email: {
        type: String,
        // unique: true,
        sparse: true,
        trim: true,
        validate: {
          validator: function (v) {
            if(v){

            
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)}
          },
          message: 'Adresa elektronike nuk është valide',
        },
      },
      phone_number:{
        type: String,
      },
    deleted: {
      type: Boolean,
      default: false
    },
    activity:[
      {
        _id:false,
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



const Client = mongoose.model('Client', clientSchema)

module.exports = Client
