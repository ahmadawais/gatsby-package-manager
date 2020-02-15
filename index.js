#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	handleError(`UNHANDLED`, err);
});


/**
 * Gatsby Package Manager.
 */
module.exports = () => {};
