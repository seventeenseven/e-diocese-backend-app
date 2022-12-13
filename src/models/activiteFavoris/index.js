import mongoose, { Schema } from 'mongoose'

const activiteFavorisSchema = new Schema(
  {
    activite: {
      type: Schema.Types.ObjectId,
      ref: 'Activite',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

activiteFavorisSchema.methods = {

}

activiteFavorisSchema.statics = {
  async createActiviteFav (favoris) {
    return this.create(favoris)
  }
}

const model = mongoose.model('ActiviteFavoris', activiteFavorisSchema)

export const schema = model.schema
export default model
