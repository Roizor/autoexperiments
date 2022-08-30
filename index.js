const { Plugin } = require('powercord/entities');

module.exports = class AutoExperiments extends Plugin {
	startPlugin() {
		let wpRequire;
		window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
		let mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.default?.isDeveloper !== "undefined")
		window.autoexp = mod;
		let usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
		let nodes = Object.values(mod.exports.default._dispatcher._actionHandlers._dependencyGraph.nodes);
		try {
			nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
		} catch (e) {}
		let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
		usermod.exports.default.__proto__.getCurrentUser = () => ({hasFlag: () => true})
		nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
		usermod.exports.default.__proto__.getCurrentUser = oldGetUser
	}

	pluginWillUnload() {
		let wpRequire;
		window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
		let mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.default?.isDeveloper !== "undefined")
		window.autoexp = mod;
		let usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
		let nodes = Object.values(mod.exports.default._dispatcher._actionHandlers._dependencyGraph.nodes);
		try {
			nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
		} catch (e) {}
		let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
		usermod.exports.default.__proto__.getCurrentUser = () => ({hasFlag: () => false})
		nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
		usermod.exports.default.__proto__.getCurrentUser = oldGetUser
	}
};
