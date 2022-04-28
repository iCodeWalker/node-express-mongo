const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // a callback function that runs when server starts listening on port 8000;
  console.log(`App is running on port ${port}..`);
});
