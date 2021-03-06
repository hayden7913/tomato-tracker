const shouldDeleteDb = false;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');

const app = express();

// const shouldResetDb = false;

const { PORT, DATABASE_URL } = require('./server-files/config');
const { FeatureRequests, Projects } = require('./server-files/models');
// const { sampleData } = require('./server-files/sampleData');

const projectRouter = require('./server-files/routes/projectRouter');
const taskRouter = require('./server-files/routes/taskRouter');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

projectRouter.use('/:id/tasks', taskRouter);
app.use('/projects', projectRouter);

app.get('/fr', (req, res) => {
  FeatureRequests
    .find()
    .exec()
    .then(data => res.json(data))
});

app.post('/fr', (req, res) => {
  console.log('post hit')
  FeatureRequests
    .create({
      featureRequests: req.body.featureRequests
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.put('/fr/:frId', (req, res) => {
  console.log('put endpoint hit')

  const toUpdate = {
    featureRequests: req.body.featureRequests,
  }

  FeatureRequests
    .findByIdAndUpdate(req.params.frId, toUpdate)
    .exec()
    .then(project => res.status(204).json(toUpdate))
    .catch(err =>
      res.status(500).json({message: 'Internal server error'})
    );
});

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// function resetDb() {
//     return new Promise((resolve, reject) => {
//         console.warn('Resetting database');
//         mongoose.connection.dropDatabase()
//     .then((result) => {
//         seedSampleData();
//         resolve(result);
//     })
//     .catch((err) => { return reject(err); });
//     });
// }
function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
      .then((result) => { return resolve(result); })
      .catch((err) => { return reject(err); });
    });
}

// if (shouldResetDb === true) {
//     resetDb();
// }

if (shouldDeleteDb === true) {
    console.log('**************** Deleting Database *********************');
    tearDownDb();
}

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, { useMongoClient: true }, (err) => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Server is running at ${chalk.bold.cyan('http://localhost:' + port)}`);
                resolve();
            })
      .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
      });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch((err) => { return console.error(err); });
}

module.exports = { app, runServer, closeServer };
