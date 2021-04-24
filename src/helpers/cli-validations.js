const chalk = require('chalk');

const showCommands = {
	recent: chalk.cyan('node get-recent-recordings ' + chalk.yellow('99')),
	checklist: chalk.cyan('node create-items-checklist ' + chalk.yellow('99'))
}

const validations = {
	performersPages: (first, second, command) => {
		if (process.argv.length > first) {
			validations.pages(second, command);
			return true;
		} else { error('\nperformer parameter is missing.', command) }
	},
	pages: (parameterPosition, command) => {
		if (process.argv.length > parameterPosition) {
			const parameter = process.argv[parameterPosition];
			const pattern = /([0-9]{1,2})/;
			if (!pattern.test(parameter)) { error('\npages must be a number.', command) }
			length = parameter.toString().length;
			if (length > 3) { error('\npages must have 3 digits max.', command) }
			return true;
		} else { error('\npages parameter is missing.', command) }
	}
}

const error = (message, command) => {
	console.error(chalk.red(message));
	console.log(showCommands[command] + '\n');
	process.exit(1);
}

module.exports = validations;