import News from '~/models/news'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const news = await News.createNews(body)
    return res.json({ success: true, news })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
