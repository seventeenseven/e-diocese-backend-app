import User from '../../../models/user/index.js'
import Image from '../../../models/image/index.js'
import Comment from '../../../models/comment/index.js'

export default async ({ params }, res, next) => {
  try {
    const craftsman = await User.findById(params.id)
    const images = await Image.findOne({ user: params.id })
    const comments = await Comment.find({ craftsman: params.id }).populate('author').sort({ createdAt: -1 })
    return res.json({
      success: true,
      ...craftsman.view(true),
      images,
      comments
    })
  } catch (err) {
    return next(err)
  }
}
