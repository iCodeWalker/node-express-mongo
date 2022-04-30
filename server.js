const mongoose = require('mongoose');

const dotenv = require('dotenv');
const req = require('express/lib/request');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection success');
  })
  .catch((err) => console.log(err));

// const Tour = mongoose.model('Tour', tourSchema);

// testTour is instance of Tour model
// const testTour = new Tour({
//   name: 'The park Camper',
//   price: 997,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => console.log('ERROR.......', err));

// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // a callback function that runs when server starts listening on port 8000;
  console.log(`App is running on port ${port}..`);
});
