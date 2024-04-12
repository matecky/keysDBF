import { deobfuscate } from "js-deobfuscator";
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"
import { Deobfuscator } from 'obfuscator-io-deobfuscator'

const source = "abcdefgh"
const output = deobfuscate(source);
console.info("Success!")

