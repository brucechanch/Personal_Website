import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema(
  {
    degree: String,
    college: String,
    year: String,
  },
  { timestamps: true }
)

const Education =
  mongoose.models.Education || mongoose.model('Education', EducationSchema)

export default Education
