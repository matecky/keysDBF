//import deobfuscate  from "javascript-deobfuscator"
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"

var tools = require("javascript-deobfuscator/src/index.ts");
const source = "abcdefgh"
const output = tools.deobfuscate(source);
console.info("Success!")

