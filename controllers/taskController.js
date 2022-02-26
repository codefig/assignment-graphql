const Database = require('../repository/database');

class TaskController {

    constructor() {
        this.db = new Database();
    }

    async addTask(req, res) {
        try {
            const result = this.db.addTask(req.body.phaseId, req.body.taskName)
            if (result) {
                return res.json({ status: 201, message: "Task added successfully" });
            }
            return res.json({ status: 403, message: "Phase isn't unlocked yet, could not add task" })
        } catch (error) {
            //add logging functionality
            return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
        }
    };

    async updateTask(req, res) {
        try {
            const result = this.db.updateTask(req.body.phaseId, req.body.taskId, req.body.status)
            if (result) {
                return res.json({ status: 200, message: "Task updated successfully" });
            }
            return res.json({ status: 500, message: "Phase isn't unlocked yet, could not add task" })
        } catch (error) {
            //add logging functionality
            return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
        }
    };

    async getTasks(req, res) {

        try {
            const result = this.db.getTasks(req.params.phaseId)
            if (result) {
                return res.json({ status: 200, data: result });
            }
            return res.json({ status: 403, message: "Phase isn't unlocked yet, couldn't get tasks for phase " })
        } catch (error) {
            //add logging functionality
            return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
        }
    };


}

module.exports = TaskController;



