const mongoose = require('mongoose')

const ownerInvestmentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Vlera e investimit nga pronari është e zbrazet'],
      min: [0.1, 'Vlera e investimit nga pronari nuk duhet të jet më e vogël se 0.1'],
      max: [9999999, 'Vlera e investimit nga pronari nuk duhet të jet më e madhe se 9999999'],
      validate: {
        validator: function(value) {
          return value > 0;
        },
        message: 'Vlera e investimit nga pronari duhet të jetë më e madhe se 0'
      }
    },
    year:{
  type:String,
  required: [true, 'Viti i investimit nga pronari është e zbrazet'],
    },
    unit: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Unit është i zbrazët'],
      ref: 'Unit',
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

const OwnerInvestment = mongoose.model('OwnerInvestment', ownerInvestmentSchema)

module.exports = OwnerInvestment

