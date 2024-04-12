import { deobfuscate } from "javascript-deobfuscator/src/index.ts"
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"


const source = "abcdefgh"
const output = deobfuscate(source);
console.info("Success!")

