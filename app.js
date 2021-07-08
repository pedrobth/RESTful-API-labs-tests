require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { TestsRoutes } = require('./routes');
// const { LabRoutes, TestsRoutes } = require('./routes');
const { errMiddleware } = require('./middlewares');

const PORT = process.env.PORT || 3001;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// app.use('/lab', LabRoutes);
app.use('/tests', TestsRoutes);
app.use(errMiddleware);

app.listen(PORT, () => console.log(`Server at port ${PORT}`));
