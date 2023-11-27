const mongoose = require('mongoose')
const StrategicInvestmentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Vlera e investimit eshte e zbrazet'],
      min: [0, 'Vlera e investimit nuk duhet të jet më e vogël se 0'],
      max: [
        9999999,
        'Vlera e investimit nuk duhet të jet më e madhe se 9999999',
      ],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Kategoria  është e zbrazët'],
      ref: 'CategoryOutcome',
    },
    year:{
      type:String,
      required: [true, 'Viti i investimit strategjik është i zbrazët'],
        },
        unit: {
          type: mongoose.Schema.ObjectId,
          required: [true, 'Unit është i zbrazët'],
          ref: 'Unit',
        },
    note: {
      type: String,
      maxLength: [150, 'Shënimi nuk duhet të jet më i gjatë se 150 karaktere'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'User reference eshte i zbrazet'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const StrategicInvestment = mongoose.model(
  'StrategicInvestment',
  StrategicInvestmentSchema
)

module.exports = StrategicInvestment
