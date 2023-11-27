const mongoose = require('mongoose')
const wageSchema = new mongoose.Schema(
  {
    month: {
        type: String,
        enum:{
            values: ['january','february',"march","april","may","june","july","august","september","october","november","december",""],
            message: `Muaji është i zbrazët`,
          },
        required: [true, 'Muaji është i zbrazët'],
      },
      year: {
        type: String,
        required: [true, 'Viti është i zbrazët'],
      },
    month_ref:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Month' 
    },
    salary:{
    type:Number,
    required: [true, 'Rroga është e zbrazët'],
    },
    salary_after_debt:{
      type:Number,
      required: [true, 'Rroga është e zbrazët'],
      },
      worker:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' ,
        required:[true,'Puntori është i zbrazët']
      },
    debt_payed:{
    type:Number
    },
    comment:{
      type:String
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



const Wage = mongoose.model('Wage', wageSchema)

module.exports = Wage
