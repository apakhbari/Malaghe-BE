import mongoose from 'mongoose'
import { Password } from '../utils/password'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface UserAttrs {
  fiName: string
  laName: string
  isMale: boolean
  email?: string
  mobile: string
  phone?: string
  photo?: string
  locations?: [
    {
      address?: string
      postalCode?: string
      long?: string
      lat?: string
    }
  ]
  role?: number
  password: string
  isActive?: Boolean
  createdAt?: Date
  passwordResetToken?: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
  fiName: string
  laName: string
  isMale: boolean
  email?: string
  mobile: string
  phone?: string
  photo?: string
  locations?: [
    {
      address?: string
      postalCode?: string
      long?: string
      lat?: string
    }
  ]
  role?: number
  password: string
  isActive?: Boolean
  createdAt?: Date
  passwordResetToken?: string
  version: number
}

const userSchema = new mongoose.Schema(
  {
    fiName: {
      type: String,
      required: true,
    },
    laName: {
      type: String,
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    photo: {
      type: String,
      required: false,
    },
    locations: [
      {
        address: String,
        postalCode: String,
        long: String,
        lat: String,
      },
    ],
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.role
        delete ret.__v
      },
    },
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.set('versionKey', 'version')
userSchema.plugin(updateIfCurrentPlugin)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
