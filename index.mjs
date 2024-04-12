import { deobfuscate } from "js-deobfuscator";
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"
import { deobfuscate as dbf} from 'obfuscator-io-deobfuscator'
import pkg from 'obfuscator-io-deobfuscator';
const { Deobfuscator } = pkg;
const source = "abcdefgh"
const output = deobfuscate(source);
console.info("Success!")

