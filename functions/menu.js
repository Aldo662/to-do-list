const colors = require('colors');

const showMenu = () => {
	return new Promise((resolve, reject) => {
		console.clear()
		const headerfooter = '  =========================  '
		const title = '             Menu            '  

		console.log(colors.rainbow(headerfooter))
		console.log(colors.white(title))
		console.log(colors.rainbow(headerfooter))

		console.log(`\n ${'1.'.red} Crear tarea`);
		console.log(` ${'2.'.red} Listar tarea`);
		console.log(` ${'3.'.red} Listar tareas`);
		console.log(` ${'4.'.red} Listar tareas completadas`);
		console.log(` ${'5.'.red} Listar tareas pendientes`);
		console.log(` ${'6.'.red} Completar tareas(s)`);
		console.log(` ${'0.'.red} Salir\n`);
		
		const readline = require('readline');
		const rl = readline.createInterface(process.stdin, process.stdout);

		rl.question('Select an option: ', answer => {
			rl.close();
			resolve(answer);
		})
	})
}

const pause = response => {
	return new Promise((resolve, reject) => {
		const readline = require('readline');
		const rl = readline.createInterface(process.stdin, process.stdout);
	
		rl.question(`Press ${colors.red('ENTER')} to continue...`, () => {
			rl.close();
			resolve(`Perfect you chose ${response}`)
		});
	})
}

module.exports = {
	showMenu,
	pause,
}
