//get name of fruit name and add in 'fruit.json' file 
//if name is already there then do not insert

const path = require('path');


const yargs = require('yargs')
const colors = require('colors');
const {loadfruit,repeated,savenote,deletenote,updatenote} = require('./MyModule');
const fs = require('fs');


yargs.command({
	command: 'addfruit',
	describe: 'Add fruits',
	builder: {
		fruitName: {
			describe: 'Fruit name',
			demandOption: true, // Required
			type: 'string'
		},
	},

	handler(argv) {
		let file = __dirname + '/fruit.json';
		savenote(argv.fruitName);
	}
})


yargs.command({
	command: 'deletefruit',
	describe: 'delete fruits',
	builder: {
		fruitName: {
			describe: 'Fruit name',
			demandOption: true, // Required
			type: 'string'
		},
	},

	handler(argv) {
		let file = __dirname + '/fruit.json';
		deletenote(argv.fruitName);
	}
})

yargs.command({
	command: 'updatefruit',
	describe: 'update fruits',
	builder: {
		oldName: {
			describe: 'Fruit old name',
			demandOption: true, // Required
			type: 'string'
		},
		newName: {
			describe: 'Fruit New name',
			demandOption: true, // Required
			type: 'string'
		}
	},

	handler(argv) {
		let file = __dirname + '/fruit.json';
		updatenote(argv.oldName,argv.newName);
	}
})



yargs.parse()



//node index.js addfruit --fruitName=watermelon
//node index.js updatefruit --oldName=watermelon --newName=orange
//node index.js deletefruit --fruitName=orange

