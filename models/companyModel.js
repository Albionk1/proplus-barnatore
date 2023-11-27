const mongoose = require('mongoose')
const companySchema = new mongoose.Schema(
  {
    company_name: {
        type: String,
        required: [true, 'Emri i biznesit është i zbrazët'],
      },
    address: {
        type: String,
        required: [true, 'Adresa është e zbrazët'],
      },
    arbk: {
        type: String,
        required: [true, 'Numri i biznesit është i zbrazët'],
      },
    phone_number: {
      type: String,
      required: [true, 'Numri i telefonit është i zbrazët'],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: [true,'Adresa elektronike është i zbrazët'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'Adresa elektronike nuk është në formatin e duhur',
      },
    },
    fb: {
      type: String,
    },
    tw: {
      type: String,
    },
    ig: {
      type: String,
    },
    mission_vision: {
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



const Company = mongoose.model('Company', companySchema)

module.exports = Company
