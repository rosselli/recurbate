const chalk = require('chalk');

module.exports = [
	{
		run: chalk.cyan('update-performers-checklist ') + chalk.yellow('<pages>'),
		description: 'Update the performer\'s Checklists based on information requested from site.',
	},

	{
		run: chalk.cyan('create-items-checklist ') + chalk.yellow('<performer>') + ' ' + chalk.yellow('<pages>'),
		description: 'Create the performers Checklist items based on information requested from site.',
	},

	{
		run: chalk.cyan('all-performers-set-status') + chalk.yellow('       '),
		description: 'Set performer\'s status in the All Performers Checklist based on lists got manually from site.',
	},

	{
		run: chalk.cyan('set-videos-checked') + chalk.yellow('       '),
		description: 'Set performer\'s downloaded videos to checked based on hard disk file\'s list.',
	},

	{
		run: chalk.cyan('get-recent-recordings ') + chalk.yellow('<pages>'),
		description: 'Get the performers recent recordings to provide a payload for React.',
	},


	// {
	// 	run: chalk.cyan('node update-performers-checklist ' + chalk.yellow('<pages>')),
	// 	description: '',
	// },
	//
	// {
	// 	run: chalk.cyan('node update-performers-checklist ' + chalk.yellow('<pages>')),
	// 	description: '',
	// },

]
