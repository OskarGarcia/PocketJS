const typescript  = require("rollup-plugin-typescript")
const {uglify} = require("rollup-plugin-uglify")

const banner =
  `/** @license Pocket v${process.env.VERSION}\n`+
  ' * JavaScript Library\n' + 
  ' *\n' +
  ` * Copyright (c) ${new Date().getFullYear()} Oskar Garcia\n` +
  ' *\n' +
  ' * This source code was released under the MIT license.\n' +
  ' */'

const plugins = [
  typescript({lib: ["es5", "es6", "dom"], target: "es5"})
]

let nameFile = "pocket.js"

if(process.env.NODE_ENV.trim() == "production"){
  nameFile = "pocket.min.js"
  plugins.push(uglify({
    output: {
      comments: function(node, comment) {
        if (comment.type === "comment2") {
          return /@preserve|@license|@cc_on/i.test(comment.value);
        }
        return false;
      }
    }
  }))
}

module.exports = {
    input: "src/index.ts",
    plugins,
    output: {
      file: `dist/${nameFile}`,
      format: "umd",
      banner: banner,
      name: "Pocket"
    },
  }