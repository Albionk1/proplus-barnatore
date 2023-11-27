const mongoose = require('mongoose')
const articlePriceSchema = new mongoose.Schema(
  {
    article:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Article',
       required: [true, 'Artikulli është i zbrazët'],
    },
    barcode: {
        type: String,
        required: [true, 'Barkodi është i zbrazët'],
      },
    unit: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
        required: [true, 'Zgjedh njesin'],
      },
      price_few:{
        type: Number,
        required: [true, 'Qmimi pakic është i zbrazët'],
      },
      price_many:{
        type: Number,
        required: [true, 'Qmimi shumic është i zbrazët'],
      },
      statusi:{
        type: String,
   
      },
      comment:{
        type: String,
      },
      price_few_discount: {
        type: Number,
      },
      price_many_discount: {
        type: Number,
      },
      target_few:{
        type:String,
        enum:{
            values: ['card','all',''],
            message: `Zgjedh parametrin e shitjes`,
          },
      },
      target_many:{
        type:String,
        enum:{
            values: ['card','all',''],
            message: `Zgjedh parametrin e shitjes`,
          },
      },
      discount_date_few_start:{
        type: Date,
      },
      discount_date_many_start:{
        type: Date,
      },
      discount_date_few:{
        type: Date,
      },
      discount_date_many:{
        type: Date,
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



const ArticlePrice = mongoose.model('ArticlePrice', articlePriceSchema)

module.exports = ArticlePrice
