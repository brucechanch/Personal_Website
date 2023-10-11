import mongoose from 'mongoose'

export default async function connectToDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://brucechanch:y4529411@cluster0.z3kednh.mongodb.net/'
    )
    console.log('Database Connected Successfully')
  } catch (e) {
    console.log(e)
  }
}
