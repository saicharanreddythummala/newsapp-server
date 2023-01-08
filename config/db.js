import mongoose from 'mongoose';

const createConnection = async () => {
  mongoose.set('strictQuery', false);

  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected`);
    });
};

export { createConnection };
