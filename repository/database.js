const uuid = require('uuid');

class Database {

    constructor() {

        this.allphases = [
            {
                id: 1,
                name: "Foundation",
                completed: false,
                tasks: [],
            },
            {
                id: 2,
                name: "Discovery",
                completed: false,
                tasks: [],
            },
            {
                id: 3,
                name: "Delivery",
                completed: false,
                tasks: [],
            },
        ];
    }


    isPhaseCompleted(phaseIndex) {
        let isCompleted = false;
        if (phaseIndex >= 0) {
            if (this.allphases[phaseIndex].tasks.length == 0) {
                return false;
            }
            let task = this.allphases[phaseIndex].tasks.find(task => !task.completed)
            if (!task) isCompleted = true;
        }
        return isCompleted;
    }

    getPhases() {

        return new Promise((resolve, reject) => {
            resolve(this.allphases);
        })
    }

    getPhase(phaseId) {
        return new Promise((resolve, reject) => {
            if (phaseId < 0 || phaseId > 3) {
                reject("Error, phase doesn't exist with that ID");
            }
            const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
            const result = this.allphases[phaseIndex];
            resolve(result);
        })
    }

    updatePhase(phaseId) {
        const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
        if (phaseIndex >= 0) {
            this.allphases[phaseIndex].completed = true
            return true;
        }
        return false;
    }

    getTasks(phaseId) {
        return new Promise((resolve, reject) => {
            const phaseIndex = this.allphases.findIndex(phase => phase.id === Number(phaseId));
            if (phaseIndex >= 0) {
                resolve(this.allphases[phaseIndex].tasks);
            }
            reject("Tasks for Phase not found");
        })
    }

    //Write method for individual task getting;

    addTask(phaseId, body) {

        return new Promise((resolve, reject) => {

            const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
            const newTask = { id: uuid.v4(), body, completed: false, created_at: new Date(), updated_at: new Date() }
            if (phaseIndex >= 0) {
                if (this.isPhaseCompleted(phaseIndex)) {
                    reject("Sorry, phase completed. you can only add to subsequent phases");
                }
                if (phaseIndex > 0 && !this.isPhaseCompleted(phaseIndex - 1)) {
                    reject("Cannot add task for the phase");
                } else {
                    this.allphases[phaseIndex].tasks.push(newTask)
                    this.allphases[phaseIndex].completed = false;
                }
            }
            resolve(newTask);
        })
    }

    updateTask(phaseId, taskId, status) {
        return new Promise((resolve, reject) => {

            const phaseIndex = this.allphases.findIndex(phase => phase.id === phaseId);
            let updatedTask = {};
            if (phaseIndex >= 0) {
                if (phaseIndex > 0 && !this.isPhaseCompleted(phaseIndex - 1)) {
                    reject("Cannot update task for this phase");
                }
                const phaseTasks = this.allphases[phaseIndex].tasks;
                const taskIndex = phaseTasks.findIndex(task => taskId === task.id);

                if (taskIndex >= 0) {
                    phaseTasks[taskIndex].completed = status;
                    updatedTask = phaseTasks[taskIndex];
                }
                if (this.isPhaseCompleted(phaseIndex)) {
                    this.allphases[phaseIndex].completed = true;
                }
            }
            resolve(updatedTask);
        })
        //cehck if the 
    }


}

module.exports = Database;
// On Update task status  : check if all task for previous phase is completed
// Before you can add taks to a phase:  all takss in previous phase must have been compleeted 