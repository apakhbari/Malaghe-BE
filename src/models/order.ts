import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface orderAttrs {
  code: number

  userId?: Types.ObjectId
  userName: string
  isMale: boolean
  mobile: string
  phone?: string
  postalCode?: string
  address?: string
  lat?: string
  long?: string
  description?: string

  prepayment?: number
  overallPrice?: number
  usedDiscountCode?: boolean
  discountCode?: string
  paymentKind?: number
  hasPaid?: boolean

  orderStatus: number
  isClientSide?: boolean
  isDone?: boolean

  isExpress?: boolean
  isService: boolean
  serviceKind?: number

  workflow: [
    {
      time: Date
      flowStatus: number
      description?: string
      by?: number
      attachment?: string
    }
  ]

  products: [
    {
      title: string
      description?: string
      initialPrice?: number
      price?: number
      quantity?: number
    }
  ]
  createdAt?: Date
}

interface orderDoc extends mongoose.Document {
  code: number

  userId?: Types.ObjectId
  userName: string
  isMale: boolean
  mobile: string
  phone?: string
  postalCode?: string
  address?: string
  lat?: string
  long?: string
  description?: string

  prepayment?: number
  overallPrice?: number
  usedDiscountCode?: boolean
  discountCode?: string
  paymentKind?: number
  hasPaid?: boolean

  orderStatus: number
  isClientSide?: boolean
  isDone?: boolean

  isExpress?: boolean
  isService: boolean
  serviceKind?: number

  workflow: [
    {
      time: Date
      flowStatus: number
      description?: string
      by?: number
      attachment?: string
    }
  ]

  products: [
    {
      title: string
      description?: string
      initialPrice?: number
      price?: number
      quantity?: number
    }
  ]
  createdAt?: Date
  version: number
}

interface orderModel extends mongoose.Model<orderDoc> {
  build(attrs: orderAttrs): orderDoc
}

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },

    userId: {
      type: Types.ObjectId,
      required: false,
    },
    userName: {
      type: String,
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    lat: {
      type: String,
      required: false,
    },
    long: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },

    prepayment: {
      type: Number,
      required: false,
    },
    overallPrice: {
      type: Number,
      required: false,
    },
    usedDiscountCode: {
      type: Boolean,
      required: false,
    },
    discountCode: {
      type: String,
      required: false,
    },
    paymentKind: {
      type: Number,
      required: false,
    },
    hasPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    orderStatus: {
      type: Number,
      required: true,
    },
    isClientSide: {
      type: Boolean,
      required: false,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },

    isExpress: {
      type: Boolean,
      required: false,
    },
    isService: {
      type: Boolean,
      required: true,
    },
    serviceKind: {
      type: Number,
      required: false,
    },

    workflow: [
      {
        time: Date,
        flowStatus: Number,
        description: String,
        by: Number,
        attachment: String,
      },
    ],

    products: [
      {
        title: String,
        description: String,
        initialPrice: Number,
        price: Number,
        quantity: Number,
      },
    ],

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

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: orderAttrs) => {
  return new Order(attrs)
}

const Order = mongoose.model<orderDoc, orderModel>('Order', orderSchema)

export { Order }
