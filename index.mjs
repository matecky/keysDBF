import { deobfuscate } from "js-deobfuscator";
//import { deobfuscate } from "javascript-deobfuscator";
import { writeFile } from "node:fs/promises"
import { assert } from "node:console"
import { deobfuscate as dbf} from 'obfuscator-io-deobfuscator'


const checkDeobfs = (x) => x.indexOf("<video />") !== -1
const dbfConfig = {
    silent: false,
    objectSimplification: {
        isEnabled: true,
        unsafeReplace: true
    },
    objectPacking: {
        isEnabled: true
    },
    proxyFunctionInlining: {
        isEnabled: true
    },
    stringRevealing: {
        isEnabled: true
    },
    expressionSimplification: {
        isEnabled: true
    },
    constantPropagation: {
        isEnabled: true
    },
    reassignmentRemoval: {
        isEnabled: true
    },
    sequenceSplitting: {
        isEnabled: true
    },
    controlFlowRecovery: {
        isEnabled: true
    },
    deadBranchRemoval: {
        isEnabled: true
    },
    unusedVariableRemoval: {
        isEnabled: true
    },
    propertySimplification: {
        isEnabled: true
    }
}
const deobfuscationConfig = {
  verbose: false,
  arrays: {
    unpackArrays: true,
    removeArrays: true,
  },
  proxyFunctions: {
    replaceProxyFunctions: true,
    removeProxyFunctions: true,
  },
  expressions: {
    simplifyExpressions: true,
    removeDeadBranches: true,
  },
  miscellaneous: {
    beautify: true,
    simplifyProperties: true,
    renameHexIdentifiers: false,
  },
};
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
	
    const firstTry = deobfuscate(obfuscatedScript .toString(), deobfuscationConfig)
    const secondTry = dbf(firstTry .toString());
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

