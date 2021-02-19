/* eslint-disable camelcase */
import cleaner from "rollup-plugin-cleaner";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { resolve as resolveDir } from "path";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: {
		file: "./dist/index.js",
		format: "cjs"
	},
	plugins: [
		cleaner({targets: ["./dist/"]}),
		resolve(),
		commonjs(),
		typescript({tsconfig: resolveDir(__dirname, "src", "tsconfig.json")}),
		terser({
			ecma: 2020,
			compress: {
				drop_console: true,
				arguments: true,
				passes: 2
			},
			format: { comments: false }
		})
	]
};
