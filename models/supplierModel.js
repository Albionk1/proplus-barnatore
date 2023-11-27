const mongoose = require('mongoose')
const supplierSchema = new mongoose.Schema(
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
        required: [true, 'Adresa e biznesit është i zbrazët'],
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



const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier
