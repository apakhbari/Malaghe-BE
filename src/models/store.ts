import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { Type } from 'typescript'

interface storeAttrs {
  title: string
  description?: string
  summary?: string
  volumes?: {
    width: string
    length: string
    height: string
    weight: string
  }
  photos?: [string]
  madeIn?: string
  goodKind: goodKind
  availableQuantity: number
  ratingsAverage?: number
  ratingsQuantity?: number
  comments?: [
    {
      id?: Types.ObjectId
      name?: string
      message?: string
      createdAt?: Date
    }
  ]
  price: number
  hasDiscount?: boolean
  discountKind?: discountKind
  discountedPrice?: number
  createdAt?: Date
  createdBy: Types.ObjectId
  hasMag: boolean
  magLink?: string
}

enum discountKind {
  percentage = 'درصد',
  exactPrice = 'قیمت نهایی',
}

enum goodKind {
  device = 'دستگاه',
  segment = 'قطعه',
}

interface storeDoc extends mongoose.Document {
  title: string
  description?: string
  summary?: string
  volumes?: {
    width: string
    length: string
    height: string
    weight: string
  }
  photos?: [string]
  madeIn?: string
  goodKind: goodKind
  availableQuantity: number
  ratingsAverage?: number
  ratingsQuantity?: number
  comments?: [
    {
      id?: Types.ObjectId
      name?: string
      message?: string
      createdAt?: Date
    }
  ]
  price: number
  hasDiscount?: boolean
  discountKind?: discountKind
  discountedPrice?: number
  createdAt?: Date
  createdBy: Types.ObjectId
  hasMag: boolean
  magLink?: string
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
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },

    volumes: {
      width: String,
      length: String,
      height: String,
      weight: String,
    },

    photos: [
      {
        type: String,
        required: false,
      },
    ],

    madeIn: {
      type: String,
    },
    goodKind: {
      type: goodKind,
    },

    availableQuantity: {
      type: Number,
      required: true,
    },
    ratingsAverage: {
      type: Number,
      required: true,
      default: 5,
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
        createdAt: Date,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    hasDiscount: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasMag: {
      type: Boolean,
    },
    magLink: {
      type: String,
      required: false,
    },
    discountKind: {
      type: discountKind,
      required: false,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
    createdBy: {
      type: Types.ObjectId,
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
