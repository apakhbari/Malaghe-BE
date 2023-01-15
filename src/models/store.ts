import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { Type } from 'typescript'

interface storeAttrs {
  title: string
  description?: string
  summary?: string
  goodKind?: number

  madeIn?: number
  material?: string
  width?: number
  length?: number
  height?: number
  weight?: number

  photoNum?: number
  photos?: [string]

  availableQuantity?: number
  ratingsAverage?: number
  ratingsQuantity?: number
  comments?: [
    {
      id?: Types.ObjectId
      name?: string
      message?: string
      rate?: number
      createdAt?: Date
    }
  ]

  price?: number
  hasDiscount?: boolean
  discountKind?: number
  discountedPrice?: number

  hasMag?: boolean
  magLink?: string

  createdBy?: Types.ObjectId
  createdAt?: Date
}

interface storeDoc extends mongoose.Document {
  title: string
  description?: string
  summary?: string
  goodKind?: number

  madeIn?: number
  material?: string
  width?: number
  length?: number
  height?: number
  weight?: number

  photoNum?: number
  photos?: [string]

  availableQuantity?: number
  ratingsAverage?: number
  ratingsQuantity?: number
  comments?: [
    {
      id?: Types.ObjectId
      name?: string
      message?: string
      rate?: number
      createdAt?: Date
    }
  ]

  price?: number
  hasDiscount?: boolean
  discountKind?: number
  discountedPrice?: number

  hasMag?: boolean
  magLink?: string

  createdBy?: Types.ObjectId
  createdAt?: Date

  version: number
}

interface storeModel extends mongoose.Model<storeDoc> {
  build(attrs: storeAttrs): storeDoc
}

const storeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    goodKind: {
      type: Number,
      required: false,
    },

    madeIn: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    length: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    material: {
      type: String,
      required: false,
    },

    photoNum: {
      type: Number,
      required: false,
    },
    photos: [
      {
        type: String,
        required: false,
      },
    ],

    availableQuantity: {
      type: Number,
      required: false,
    },
    ratingsAverage: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [
      {
        id: Types.ObjectId,
        name: String,
        message: String,
        rate: Number,
        createdAt: Date,
      },
    ],

    price: {
      type: Number,
      required: false,
    },
    hasDiscount: {
      type: Boolean,
      required: true,
      default: false,
    },
    discountKind: {
      type: Number,
      required: false,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },

    hasMag: {
      type: Boolean,
    },
    magLink: {
      type: String,
      required: false,
    },

    createdBy: {
      type: Types.ObjectId,
      required: false,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

storeSchema.set('versionKey', 'version')
storeSchema.plugin(updateIfCurrentPlugin)

storeSchema.statics.build = (attrs: storeAttrs) => {
  return new Store(attrs)
}

const Store = mongoose.model<storeDoc, storeModel>('Store', storeSchema)

export { Store }
