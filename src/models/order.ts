import mongoose from 'mongoose'
import { Types } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface orderAttrs {
  code: number

  userId?: Types.ObjectId
  userName: string
  gender: string
  mobile: number
  phone?: number
  postalCode?: string
  address?: string
  lat?: string
  long?: string

  overallPrice?: number
  hasUsedDiscountCode?: boolean
  discountCode?: string
  paymentKind?: paymentKindEnum
  hasPaid?: boolean

  isExpress: boolean

  isDone?: boolean

  isService?: boolean
  serviceKind?: serviceKindEnum

  orderStatus?: number

  workflow: [
    {
      time: Date
      orderStatus: number
      description: string
    }
  ]

  products?: [
    {
      title?: string
      description?: string
      price?: number
      quantity?: number
    }
  ]
  createdAt?: Date
}

enum serviceKindEnum {
  repair = 'تعمیر',
  replacement = 'تعویض',
}

{
  /*
enum orderStatusEnum {
  created = 0, //'ایجاد شده',
  payment = 1, //'در انتظار پرداخت',
  transferring = 2, //'در حال جابجایی',
  received = 3, //'دریافت‌شده',
  cancelled = 4, //'مرجوع شده',

  troubleshooting = 5, //'عیب‌یابی',
  repairing = 6, //'تعمیر',
}
*/
}

enum paymentKindEnum {
  portal = 'درگاه بانکی',
  card = 'کارت به کارت',
  inPerson = 'حضوری',
}

interface orderDoc extends mongoose.Document {
  code: number

  userId?: Types.ObjectId
  userName: string
  gender: string
  mobile: number
  phone?: number
  postalCode?: string
  address?: string
  lat?: string
  long?: string

  overallPrice?: number
  hasUsedDiscountCode?: boolean
  discountCode?: string
  paymentKind?: paymentKindEnum
  hasPaid?: boolean

  isExpress: boolean

  isDone?: boolean

  isService?: boolean
  serviceKind?: serviceKindEnum

  orderStatus?: number

  workflow: [
    {
      time: Date
      orderStatus: number
      description: string
    }
  ]

  products?: [
    {
      title?: string
      description?: string
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
    gender: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
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

    overallPrice: {
      type: Number,
      required: false,
    },
    hasUsedDiscountCode: {
      type: Boolean,
      required: false,
    },
    discountCode: {
      type: String,
      required: false,
    },
    paymentKind: {
      type: paymentKindEnum,
      required: false,
    },
    hasPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    isExpress: {
      type: Boolean,
      required: false,
    },

    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },

    isService: {
      type: Boolean,
      required: false,
    },
    serviceKind: {
      type: serviceKindEnum,
      required: false,
    },

    orderStatus: {
      type: Number,
    },

    workflow: [
      {
        time: Date,
        orderStatus: Number,
        description: String,
      },
    ],

    products: [
      {
        title: String,
        description: String,
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
