const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema(
  {
    barcode: {
      type: String,
      required: [true, 'Barkodi është i zbrazët'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Emri i artikullit është i zbrazët'],
    },
    tvsh: {
      type: Number,
      enum: {
        values: [18, 10, 8, 5, 0],
        message: `Zgjedh normen e tvsh`,
      },
      required: [true, 'Tvsh është e zbrazët'],
    },
    sale_type: {
      type: String,
      enum: {
        values: ['copë', 'kg', 'L'],
        message: `Zgjedh parametrin e shitjes`,
      },
      required: [true, 'Parametri shitës është i zbrazët'],
    },
    min_qty: {
      type: Number,
      required: [true, 'Sasia minimale është e zbrazët'],
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer',
      // required: [true, 'Prodhuesi është i zbrazët'],
    },
    barcode_package: {
      type: String,
      // required: [true, 'Barkodi i paketimit është i zbrazët'],
    },
    code: {
      type: String,
      // required: [true, 'Shifra është e zbrazët'],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Group',
      // required: [true, 'Grupi është i zbrazët'],
    },
    subgroup: {
      type: mongoose.Schema.Types.ObjectId, ref: 'SubGroup',
      // required: [true, 'Nën grupi është i zbrazët'],
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Zone',
      // required: [true, 'Zona  është e zbrazët'],
    },
    price_supply: {
      type: Number,
    },
    special_article: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    activity: [
      {
        action: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ]
  },
  {
    timestamps: true,
  }
)



const Article = mongoose.model('Article', articleSchema)

module.exports = Article
