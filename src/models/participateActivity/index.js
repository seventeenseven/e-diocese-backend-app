import mongoose, { Schema } from 'mongoose'

const participateActivitySchema = new Schema(
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

participateActivitySchema.methods = {

}

participateActivitySchema.statics = {
  async createParticipateActivite (favoris) {
    return this.create(favoris)
  }
}

const model = mongoose.model('ParticipateActivity', participateActivitySchema)

export const schema = model.schema
export default model
