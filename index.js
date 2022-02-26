
const TaskController = require('./controllers/taskController');
const taskController = new TaskController();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: "Welcome to the Todo API" })
})

app.post('/task', async (req, res) => {
    return await taskController.addTask(req, res);
})

app.put('/task', async (req, res) => {
    return await taskController.updateTask(req, res);
})

app.get('/phasetasks/:phaseId', async (req, res) => {
    return await taskController.getTasks(req, res);
})

const server = app.listen(4000, function () {
    //Add room for try and catch if any exception happens in the handler
    console.log(`Application is listening on port : 4000 `)
});



/** 
 *  How to run 
 *   run the foloowing commands to Install the required pckages
 *  > npm install 
 *   After installing the packages with the above command the run 
 * > npm start or 
 * 
 * 
 * // Todo 
 *  / Add Unit Test methods with Jest to test out the functioanlity
 *  // refactor some lines into singular method calls. 
 */