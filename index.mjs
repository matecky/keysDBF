//import { deobfuscate } from "js-deobfuscator";
import { Deobfuscator } from "javascript-deobfuscator";
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"
import { deobfuscate as dbf} from 'obfuscator-io-deobfuscator'


const checkDeobfs = (x) => x.indexOf("<video />") !== -1

// See https://github.com/Claudemirovsky/worstsource-keys/issues/2
function getCodeVersion() {
    // [hour]:00:10
    const versionDate = new Date()
    versionDate.setMinutes(0)
    versionDate.setSeconds(10)
    // Get only the first 10 digits
    const timestamp = versionDate.getTime().toString().substring(0, 10)
    return parseInt(timestamp).toString(16) // Convert to HEX
}

async function getDeobfuscatedScript() {
//    const vidplayHost = "https://vidplay.lol"
//    const vidplayHost = "https://vidplay.site"
    const vidplayHost = "https://mcloud.bz"
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/120.0",
        "Referer": vidplayHost + "/e/",
        "Origin": vidplayHost
    }

    const scriptUrl = `${vidplayHost}/assets/mcloud/min/embed.js?v=${getCodeVersion()}`
    const obfuscatedScript = await fetch(scriptUrl, {headers: headers}).then(async (x) => await x.text())
	
  //  const firstTry = await deobfuscate(obfuscatedScript);
    const firstTry = await Deobfuscator(obfuscatedScript);
	
    const secondTry = await dbf(firstTry);

    return secondTry
}

const deobfuscated = await getDeobfuscatedScript() 
await writeFile("keys.json", deobfuscated, "utf8")
// Phase 4: Let's find the keys!
//if (checkDeobfs(deobfuscated)) {
//    const start = deobfuscated.substring(deobfuscated.indexOf("<video />"))
//    const end = start.substring(0, start.indexOf(".replace"))
//    const keys = Array.from(end.matchAll(/'(\w+)'/g), x => x[1])
//    assert(keys.length == 2, "Invalid array length!")
//
//    // Be happy!
//    console.info("Success!")
//    await writeFile("keys.json", JSON.stringify(keys), "utf8")
//} else {
//    // ... Or not xD
//    console.error("FAIL!")
//    await writeFile("failed.js", deobfuscated, "utf8")
//}
