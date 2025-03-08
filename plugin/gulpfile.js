/**
 * Gulp file.
*/
'use strict';

const { watch, series, src } = require("gulp")
const notify = require("gulp-notify")
const clean = require("gulp-clean")
const gulpCopy = require("gulp-copy")

/*** Common environment ***/
// Paths
const paths = {
	toClean: ".build/**/*",
	toCopy: {
		src: [
			"./**",
			"!./sass/**",
			"!./node_modules/**",
			"!./vendor/**",
			"!./bin/**",
			"!.build/**",
			"!package.json",
			"!package-lock.json",
			"!composer.json",
			"!README.md",
			"!gulpfile.js"
		],
		dst: ".build",
	},
};

// Cleanup destination path
const cleanup = () => {
	return src( paths.toClean, { read: false, allowEmpty: true } )
		.pipe(clean({ force: true }));
};

// Copy other necessary files
const copy = () => {
	return src(paths.toCopy.src, { allowEmpty: true })
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
		cleanup,
		copy,
		let_me_know
	));
};

exports.build = series(
	cleanup,
	copy
);
