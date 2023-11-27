const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
  {
    unit: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Unit',
      required: [
        function () {
          return this.role !== 'managment'
        },
        'Zgjedh njesin',
      ],

    },
    units:{
      type:String,
      required: [
        function () {
          return this.role === 'managment'
        },
        'Njesit janë të zbrazëta',
      ],
    },
    full_name:{
    type:String,
    required: [true, 'Emri dhe mbiemri është i zbrazët'],
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      required: [true,
        'Emri i përdoruesit është i zbrazët',
      ],
      maxLength: [
        100,
        'Emri i perdoruesit nuk duhet te jet me i gjat se 100 karaktere',
      ],
      validate(value) {
        if (value == '') {
          throw new Error('Emri i përdoruesit është i zbrazët')
        }
        if (value.length < 3) {
          throw new Error(
            'Emri i përdoruesit duhet të jetë më i gjatë se 3 karaktere'
          )
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Fjalëkalimi është i zbrazët'],
      minlength: [6, "Fjalëkalimi duhet të jet më i gjatë se 6 karaktere"],
      trim: true,
    },
    role:{
      type:String,
      enum:{
        values: ["superadmin", "managment","pos",'counter'],
        message: `Zgjedh pozicionin në kompani`,
      },
      required:[true,'Zgjedh pozicionin në kompani']
    },
    access:{
      type:String,
      // enum:{
      //   values: ["admin", "arc"],
      //   message: `Zgjedh pozicionin në kompani`,
      // },
      required:[true,'Zgjedh privilegjet në kompani']
    },
    date:{
      type:String,
    },
    phone_number:{
      type:String,
    },
    bank:{
      type:String,
    },
    salary_neto:{
    type:Number,
    required:[function () {
      return this.role !== 'counter'
    },'Paga neto është e zbrazët']
    },
    salary_bruto:{
      type:Number,
      required: [
        function () {
          return this.regular === true
        },
        'Paga bruto është e zbrazët',
      ],
    },
    comment:{
    type:String,
    maxlength:[255,'Maksimumi i karaktereve për koment është 255']
    },
    regular: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, 'Perdoruesi duhet te ket nje status boolean'],
    },
    deleted: {
      type: Boolean,
      default: false
    },
    start_work:{
      type:String,
      maxlength:[255,'Maksimumi i karaktereve për filimi i punës është 255']
      },
      end_work:{
        type:String,
        maxlength:[255,'Maksimumi i karaktereve për mbarimi i punës është 255']
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

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ $or: [{ email }, { username: email }] })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    if (!email.includes('@')) {
      throw Error('incorrect password username')
    } else {
      throw Error('incorrect password')
    }
  }
  if (!email.includes('@')) {
    throw Error('incorrect username')
  } else {
    throw Error('incorrect email')
  }
}


userSchema.statics.changepassword = async function (
  email,
  password,
  newPassword
) {
  const user = await this.findOne({ email })

  if (user) {
    const compare = await bcrypt.compare(password, user.password)
    if (compare) {
      user.password = newPassword
      user.save()
      return user
    }
    throw Error('incorrect password')
  }
}
userSchema.statics.changepasswordById = async function (
  id,
  password,
  newPassword
) {
  const user = await this.findById(id)

  if (user) {

    const compare = await bcrypt.compare(password, user.password)
    if (compare) {
      user.password = newPassword
      await user.save()
      return user
    }
    throw Error('incorrect password')
  }
}
// userSchema.pre('validate', function (next) {
//   if (this.role !== 'Postman' && this.password.length < 8) {
//     this.invalidate(
//       'password',
//       'Fjalëkalimi duhet të jet më i gjatë se 8 karaktere'
//     )
//   }
//   if (this.role === 'Postman' && this.password.length < 6) {
//     this.invalidate(
//       'password',
//       'Fjalëkalimi duhet të jet më i gjatë se 6 karaktere'
//     )
//   }
//   next()
// })
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
