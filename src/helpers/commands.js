const chalk = require('chalk');
const cyan = chalk.cyan;
const yellow = chalk.yellow;

module.exports = [
	{
		run: cyan('get-recent-recordings ') + yellow('<pages>'),
		description: '\tGet the performers recent recordings to provide a payload for React.',
	},
	{
		run: cyan('status') + yellow(' '),
		description: '\tOutput: performer 0% watched (watched of total) 9% downloaded (downloaded of total)',
	},
	{
		run: cyan('performers-update-checklist ') + yellow('<pages>'),
		description: '\tUpdate the performer\'s Checklists based on information requested from site.',
	},
	{
		run: cyan('performers-set-checked') + yellow(' '),
		description: '\tSet performer\'s downloaded videos to checked based on hard disk file\'s list.',
	},
	{
		run: cyan('create-items-checklist ') + yellow('<performer>') + ' ' + yellow('<pages>'),
		description: '\t\tCreate the performers Checklist items. Source: recurbate.com/performer/<performer>.' +
			'\n\t\t\t\t\t\t\tOutput: [<checked>, <videoName>, <videoLink>, <videoStatus>],\n',
	},
	{
		
		run: cyan('all-performers-set-status') + yellow(' '),
		description: '\tSet performer\'s status in the All Performers Checklist. Source: recurbate.com/performers/.',
	},
	{

		run: cyan('all-performers-counter') + yellow(' '),
		description: '\tOutput: source, performers, analyzed, favorites and rejected',
	},




	// {
	// 	run: cyan('node update-performers-checklist ' + yellow('<pages>')),
	// 	description: '\t',
	// },
	// {
	// 	run: cyan('node update-performers-checklist ' + yellow('<pages>')),
	// 	description: '\t',
	// },
]
