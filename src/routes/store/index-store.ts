import express, { Request, Response } from 'express'
import { Store } from '../../models/store'

const router = express.Router()

router.get('/api/v1/store', async (req: Request, res: Response) => {
  const stores = await Store.find(
    {},
    'title id summary createdAt price hasDiscount discountKind discountedPrice madeIn goodKind hasMag'
  )
    .sort('-createdAt')
    .limit(10)

  res.send(stores)
})

export { router as indexStoreRouter }
