const mongoose = require('mongoose')
const authorizationSchema = new mongoose.Schema(
  {
    token: {
        type: String,
        required: [true, 'Emri i biznesit është i zbrazët'],
      },
    start_time: {
        type: String,
        required: [true, 'Startimi është i zbrazët'],
      },
      end_time: {
        type: String,
        required: [true, 'Finishi është i zbrazët'],
      },
      start_time_date: {
        type: Date,
        required: [true, 'Startimi është i zbrazët'],
      },
      end_time_date: {
        type: Date,
        required: [true, 'Finishi është i zbrazët'],
      },
      comment: {
        type: String,
      },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, 'Perdoruesi duhet te ket nje status boolean'],
    },
    used: {
      type: Boolean,
      default: false,
      required: [true, 'Perdoruesi duhet te ket nje status boolean'],
    },
    deleted: {
      type: Boolean,
      default: false
    },
    // category:{
    //   type: String,
    //   enum:{
    //     values: ["company", "unit"],
    //     message: `Zgjedh pozicionin në kompani`,
    //   },
    //     required: [true, 'Kategoria është e zbrazet'],
    // }
  },
  {
    timestamps: true,
  }
)



const Authorization = mongoose.model('Authorization', authorizationSchema)

module.exports = Authorization
