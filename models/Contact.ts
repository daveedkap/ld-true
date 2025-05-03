// models/Contact.ts
import mongoose, { Schema, models, model } from 'mongoose'

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

export default models.Contact || model('Contact', ContactSchema)
