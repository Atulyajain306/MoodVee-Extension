import mongoose from "mongoose"

const dbconnection = () => {
      mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {console.log('DB connected')})
      .catch(err=> console.log(err.message))
}

export default dbconnection