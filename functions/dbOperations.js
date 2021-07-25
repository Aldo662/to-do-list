const fs = require('fs');

let file = './database/db.json';

//Save task into database
const saveTask = data => {
	return new Promise((resolve, reject) => {
		let callback = err => err ? reject(err) : resolve(data);

		fs.writeFile(file, data, 'utf8', callback);
	})	
}

const readDataBase = () => {
	return new Promise((resolve, reject) => {
		let callback = (err, data) => err ? reject(err) : resolve(JSON.parse(data));

      if (fs.existsSync(file)) fs.readFile(file, 'utf8', callback)
	})
}

module.exports =  {
	saveTask,
	readDataBase
}
