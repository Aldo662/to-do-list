const { v4: uuidiv } = require('uuid');
const colors = require('colors');

//By default date is null unless the user provide a date
//By default the task is uncomplete 
class Task {
	constructor(description) {
		this.id = uuidiv(),
		this.description = description,
		this.isCompleted = false,
		this.date = null
	}
}

//Storage to save the tasks
class StorageTasks {
	constructor() {
		this.storage = {};
	}

	get storageArray() {
		let storage = [];
		Object.keys(this.storage).forEach(key => storage = [...storage, this.storage[key]]);

		return storage;
	}

	createTask(desc) {
		let description = desc;
		const task = new Task(description);
		this.storage[task.id] = task;
	}

	saveTaskIntoDB(dataJSON) {
		dataJSON.forEach(task => this.storage[task.id] = task);
	}

   listTasks() {
      console.clear();
      console.log(colors.rainbow('  TASKS\n'))

      this.storageArray.forEach((task, i) => {
         const index = colors.red(`${i + 1})`)
         const { description, isCompleted } = task;
         const state = isCompleted ? 'Complete'.green : 'Uncomplete'.red;

         console.log(index, description, `:: ${state}`)
      })
   }

   listTaskByOption(taskStatus) {
      const printCompletedTasks = (comompletedTask, i) => {
         const { description, isCompleted } = comompletedTask;
         const state = isCompleted ? ':: Completed'.green : ':: Uncompleted'.red;
         console.log(colors.red(`${++i}`), description, state);
      }
      
      console.clear();
      console.log(colors.rainbow('  TASK COMPLETED\n'));

      this.storageArray
         .filter(task => taskStatus ? task.isCompleted : !task.isCompleted)
         .forEach(printCompletedTasks)
   }

   deleteTask(idTask) {
      delete this.storage[idTask];
   }
   
   markTaskCompleted(arrayIdTask) {
      /*arrayIdTask.forEach(idTask => this.storage[idTask].isCompleted = this.storage[idTask].isCompleted ? true : false)       
      console.log(arrayIdTask)
      arrayIdTask.forEach(id => console.log(this.storage[id])); /*
      
      /*Object.keys(this.storage).forEach(id => {
         if(arrayIdTask.includes(id)) {
            this.storage[id].isCompleted = true;  
         } else {
            this.storage[id].isCompleted = false;
         }
      }) */

      Object.keys(this.storage)
      .forEach(id => this.storage[id].isCompleted = arrayIdTask.includes[id] ? true : false)
       
   }
}

module.exports = {
	Task,
	StorageTasks
}
