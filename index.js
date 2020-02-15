#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	handleError(`UNHANDLED`, err);
});

	const promptClone = new Toggle({
		name: `root`,
		message: `Are you running this in the root directory of a Gatsby project?`
	});
	const [errRoot, root] = await to(promptClone.run());
	handleError(`ROOT`, errRoot);
	await shouldCancel(root);

	// Slug.
	const promptName = {
		type: `input`,
		name: `name`,
		initial: `gatsby-plugin-xyz`,
		message: `Gatsby package you'd like to install?`
	};
	const [errName, name] = await to(prompt(promptName));
	handleError(`NAME`, errName);
	await shouldCancel(name);
	const pkgSlug = name.name;

	// Dependencies.
	spinner.start(`${yellow(`DEPENDENCIES`)} fetching…`);

	const data = await axios.get(`https://unpkg.com/${pkgSlug}/package.json`);
	const deps = Object.keys(data.data.peerDependencies).filter(
		dep => dep !== "gatsby"
	);
	spinner.succeed(`${green(`DEPENDENCIES`)} ${deps.length} found`);

