import Promise from 'bluebird'
import mongoose from 'mongoose'
import config from '../../config.js'

mongoose.Promise = Promise

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...config.mongo.options
    })
    console.log('Database connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(-1)
  }
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
  process.exit(-1)
})

export { connectDB }
export default mongoose
