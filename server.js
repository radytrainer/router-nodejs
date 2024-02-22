const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Task APIs routers 
*/ 
let taskRouter = require('./routers/task_router');
app.use('/api/v1/tasks', taskRouter);

/**
 * User APIs routers 
*/ 
let userRouter = require('./routers/user_router');
app.use('/api/v1/users', userRouter);

