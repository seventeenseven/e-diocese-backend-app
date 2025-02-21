import Comment from '../../../models/comment/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const postComment = await Comment.createComment({ ...body, author: user.id })
    return res.json({
      success: true,
      postComment
    })
  } catch (err) {
    return next(err)
  }
}
