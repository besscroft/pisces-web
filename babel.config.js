module.exports = {
	presets: [
		[ "@vue/app", { useBuiltIns: "entry" } ]
	],
	env: {
		development: {
			// babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
			// This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
			plugins: [
				'dynamic-import-node'
			]
		}
	}
}
