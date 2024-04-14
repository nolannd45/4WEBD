import { model, Schema } from "mongoose";

const EventSchema = new Schema(
  {
    name: String,
    location: String,
    description: String,
    picture_list: Array,
    nbPlace: Number,
    countPlace:Number,
  },
  { timestamps: true }
);

export default model("Event", EventSchema);