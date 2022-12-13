import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image1: {
      type: String,
      default: null,
    },
    image2: {
      type: String,
      default: null,
    },
    image3: {
      type: String,
      default: null,
    },
    image4: {
      type: String,
      default: null,
    },
    image5: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

imageSchema.methods = {};

imageSchema.statics = {
  async createImage(images) {
    return this.create(images);
  },
};

const model = mongoose.model("Image", imageSchema);

export const schema = model.schema;
export default model;
