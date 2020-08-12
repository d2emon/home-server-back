import mongoose from 'mongoose'

const options = {
  useNewUrlParser: true,
};

const db = (uri: string) => mongoose
  .connect(uri, options)
  .then(() => mongoose.connection);

export default db;
