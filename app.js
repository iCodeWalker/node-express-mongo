const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// data from body is added to the req. using this middleware
app.use(express.json());
// use is used to add middleware to middleware stack.

// creating own middleware.
app.use((req, res, next) => {
  console.log('Hello from middleware =====');
  next(); // if we didn't call next function here the request-response cycle will stuck here. And no response will be sent
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Third party middleware.
// this middleware logs the request.

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// =======================================

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Middlewar to serve static files.

app.use(express.static(`${__dirname}/public`));

// =======================================

// -----------> defining routes
// Routing means how an apllication response to a certain client request;

// app.get('/', (req, res) => {
//   // -----------> To send a string
//   //   res.status(200).send('Hello from the server side...');

//   // -----------> To send a json data
//   res
//     .status(200)
//     .send({ message: 'This is message from server side', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/api/v1/tours', (req, res) => {
//   // this call back function is called route handler
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

// // ---------------------------------------------------------

// // Defining a route that accepts dynamic parameter

// // To make parameter optional we add "?" after parameter == '/api/v1/tours/:id/:x/:y?'

// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);

//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   //   if (id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: tour,
//     },
//   });
// });

// // ---------------------------------------------------------

// app.post('/api/v1/tours', (req, res) => {
//   // expres does not put the body data on req object. To access this data we have to use middleware
//   console.log(req.body);

//   const newId = tours[tours.length - 1].id + 1;

//   const newTour = Object.assign({ id: newId }, req.body); // creates an object by combining two objects.

//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

// // ---------------------------------------------------------

// // With put we expect our application to receives the entire new updated object.
// // And with patch we expect to receive the properties that should actually be updated on the object.

// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// });

// // ---------------------------------------------------------

// app.delete('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   // 204 means no content
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// // const port = 8000;
// // app.listen(port, () => {
// //   // a callback function that runs when server starts listening on port 8000;
// //   console.log(`App is running on port ${port}..`);
// // });

// --------------------------- DOING SOME CODE MODICATION ----------------------------------

//---------------------------------------- TOUR FUNCTIONS ----------------------------------

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  // this call back function is called route handler
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

const addTour = (req, res) => {
  // expres does not put the body data on req object. To access this data we have to use middleware
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body); // creates an object by combining two objects.

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // 204 means no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//---------------------------------------------END TOUR FUNCTIONS -----------------------

//------------------------------------------------------- USER FUNCTIONS ----------------

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

//--------------------------------------------END USER FUNCTIONS ------------------

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes are also middlewares that applies only to certain routes.

// app.route('/api/v1/tours').get(getAllTours).post(addTour);

// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// app.route('/api/v1/users').get(getAllUsers).post(createUser);

// app.route('api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

// ---------------------------- MOUNTING ROUTERS ------------------------

// const tourRouter = express.Router();
// const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// tourRouter.route('/').get(getAllTours).post(addTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);

// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// const port = 8000;
// app.listen(port, () => {
//   // a callback function that runs when server starts listening on port 8000;
//   console.log(`App is running on port ${port}..`);
// });

module.exports = app;
