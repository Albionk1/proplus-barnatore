const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const thanadevSchema = new mongoose.Schema(
  {
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
   
    isActive: {
      type: Boolean,
      default: true,
      required: [true, 'Perdoruesi duhet te ket nje status boolean'],
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

thanadevSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ username: email } )
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


thanadevSchema.statics.changepassword = async function (
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
thanadevSchema.statics.changepasswordById = async function (
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
thanadevSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const Thanadev = mongoose.model('Thanadev', thanadevSchema)

module.exports = Thanadev
