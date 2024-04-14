import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    idUser: String,
    idEvent: String,
    dateStart: Date
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);