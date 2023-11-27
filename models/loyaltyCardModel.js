const mongoose = require('mongoose')
const loyaltyCardSchema = new mongoose.Schema(
  {
    code: {
        type: String,
        required: [true, 'Kodi është i zbrazët'],
      },
    name: {
        type: String,
        required: [true, 'Emri i klientit është i zbrazët'],
      },
      email: {
        type: String,
        unique: true,
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
      phone_number: {
        type: String,
        required: [true, 'Numri i telefonit është i zbrazët'],
      },
    deleted: {
      type: Boolean,
      default: false
    },
    cashier:{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
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



const LoyaltyCard = mongoose.model('LoyaltyCard', loyaltyCardSchema)

module.exports = LoyaltyCard
