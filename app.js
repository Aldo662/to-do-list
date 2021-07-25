//My own modules
const {
	inquirerMenu, 
	inquirerPause, 
	readUsrInput,
   deleteTaskMenu,
   completeTaskMenu,
   confirm
} = require('./functions/inquirer.js');

const { saveTask, readDataBase } = require('./functions/dbOperations');
const { StorageTasks } = require('./models/classTarea');


//Main loop
const main = async () => {

	let option;
	const storageTasks = new StorageTasks();

   const data = await readDataBase();
	storageTasks.saveTaskIntoDB(data);

	do {
		option  = await inquirerMenu();

		switch (option) {
			case 1:
				const answerDescription = await readUsrInput('Task description:');
				storageTasks.createTask(answerDescription);
				await saveTask(JSON.stringify(storageTasks.storageArray));
		   	break;

			case 2:
            storageTasks.listTasks();
				break;

         case 3:
            storageTasks.listTaskByOption(true);
            break;

         case 4:
            storageTasks.listTaskByOption(false);
            break;	

         case 5:
            const arrayTaskChecked = await completeTaskMenu(storageTasks.storageArray);
            storageTasks.markTaskCompleted(arrayTaskChecked);
            await saveTask(JSON.stringify(storageTasks.storageArray));
            break;

         case 6:
            const idDeletedTask = await deleteTaskMenu(storageTasks.storageArray);
            const confirmation = await confirm('Are you sure to delete this task?');
            
            confirmation ? storageTasks.deleteTask(idDeletedTask) : 'No deleted';
            await saveTask(JSON.stringify(storageTasks.storageArray));
            break;
		}

		await inquirerPause();
	} while ( option !== 0 );
}

main();
//Ok esto si lo quiero guardar
