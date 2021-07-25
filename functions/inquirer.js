const inquirer = require('inquirer');
const colors = require('colors');

const choices = [
	{ name: `${'1)'.red} Crear tarea`, value: 1 },
	{ name: `${'2)'.red} Listar tarea`, value: 2 },
	{ name: `${'3)'.red} Listar tareas completadas`, value: 3 },
	{ name: `${'4)'.red} Listar tareas pendientes`, value: 4 },
	{ name: `${'5)'.red} Completar/Descompletar tareas`, value: 5 },
   { name: `${'6)'.red} Borrar tareas`, value: 6},
	{ name: `${'0)'.red} Salir`, value: 0 },
];

const inquirerMenu = async () => {
	const headerfooter = '  =========================  '
	const title = '             Menu            '

	console.clear();
	console.log(colors.rainbow(headerfooter));
	console.log(colors.white(title));
	console.log(colors.rainbow(headerfooter), '\n');

   const question =  {
      type: 'list',
      name: 'option',
      message: 'Select an option\n',
      choices
   }

	const { option } = await inquirer.prompt([question]);
	
	return option;
}

const inquirerPause = async () => {
   const question = {
      type: 'input',
		name: 'It is not important',
		message: `Press ${'ENTER'.red} to continue${'...'.red}`
   }

	await inquirer.prompt([question])
}

const readUsrInput = async message => {
	const question = {
		type: 'input',
		message,
		name: 'description',

		validate: input => {
			return new Promise((resolve, reject) => {
				if (typeof(input) !== 'string' || input.length === 0) {
					reject(new Error('Description must be a string and is required'));
				}

				resolve(true);
			})
		}
	}

   const { description } = await inquirer.prompt([question]);
	return description;
}

const deleteTaskMenu = async storageArray => {

   const question = {
      type: 'list',
      message: 'Delete a Task',
      name: 'option',
      choices: [],
   } 
   
   storageArray.forEach(t => question.choices = [...question.choices, {name: t.description, 
      value: t.id}])
   
   console.clear();
   const { option }  = await inquirer.prompt([question]);
   return option;
}

const completeTaskMenu = async storageArray => {
   const question = {
      type: 'checkbox',
      message: 'Complete a task',
      name: 'ids',
   }
   const genOpt = t => {return {name: t.description, value: t.id, checked: t.isCompleted ? true : false }};
   question.choices = storageArray.map(genOpt);
   
console.clear();
   const  { ids }  = await inquirer.prompt([question]);
   return ids;
} 

const confirm = async message => {
   const question = {
      type: 'confirm',
      message,
      name: 'ok'
   }

   const { ok } = await inquirer.prompt(question);
   return ok;
}
module.exports = {
	inquirerMenu,
	inquirerPause,
	readUsrInput,
   deleteTaskMenu,
   completeTaskMenu,
   confirm
}

