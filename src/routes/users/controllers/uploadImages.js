import Image from '~/models/image'

export default async ({ bodymen: { body }, user }, res, next) => {
    try {
      
      const findImages = await Image.findOne({ user: user.id })
      if (findImages) {
        await Image.updateOne({ user: user.id }, { $set: body },)
        return res.json({
          success: true,
          updated: true
        })
      }
      const images = await Image.createImage({ ...body, user: user.id })
      return res.json({
        success: true,
        images
      })
    } catch (err) {
      return next(err)
    }
  }
  