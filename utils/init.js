const updateNotifier = require('update-notifier');
const pkgJSON = require('./../package.json');
const welcome = require('cli-welcome');

module.exports = () => {
	welcome(`Gatsby Package Manager`, `by Awais.dev`, {
		bgColor: `#DABAE8`,
		color: `#000000`,
		bold: true,
		clear: true,
		version: `v${pkgJSON.version}`
	});
	updateNotifier({
		pkg: pkgJSON,
		shouldNotifyInNpmScript: true
	}).notify({ isGlobal: true });
};
