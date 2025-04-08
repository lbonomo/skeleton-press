/**
 * Gulp file.
*/
'use strict';

const { watch, series, src } = require("gulp")
const notify = require("gulp-notify")
const clean = require("gulp-clean")
const gulpCopy = require("gulp-copy")
const fs = require("fs");
const path = require("path");

/*** Common environment ***/
// Paths
const paths = {
	toClean: ".build/**/*",
	toCopy: {
		src: [
			"./**",
		],
		// Exclude node_modules and .git directories
		exclude: [
			"!./sass/**",
			"!./node_modules/**",
			"!./vendor/**",
			"!./bin/**",
			"!.build/**",
			"!package.json",
			"!package-lock.json",
			"!composer.json",
			"!composer.lock",
			"!phpunit.xml.dist",
			"!phpmd.xml",
			"!phpcs.xml",
			"!README.md",
			"!gulpfile.js"
		],
		dst: ".build",
	},
};

// Verify if the destination directory exists, if not, create it
const verifyDestination = (cb) => {
	const dir = path.resolve(paths.toCopy.dst);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	cb();
};

// Cleanup destination path
const cleanup = () => {
	return src( paths.toClean, { read: false, allowEmpty: true } )
		.pipe(clean({ force: true }));
};

// Copy other necessary files
const copy = () => {
	return src([...paths.toCopy.src, ...paths.toCopy.exclude], { allowEmpty: true })
		.pipe(gulpCopy(paths.toCopy.dst));
};

// Show notify.
const let_me_know = () => {
	return src(paths.toCopy.src).pipe(
		notify({
			message: "Dev process finished",
			onLast: true,
		})
	);
};

// Main process.
exports.dev = () => {
	watch(paths.toCopy.src, series(
		verifyDestination,
		cleanup,
		copy,
		let_me_know
	));
};

exports.build = series(
	verifyDestination,
	cleanup,
	copy
);
