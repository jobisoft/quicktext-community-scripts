"use strict";

import * as scopes from "./scope.mjs"
import { SCRIPTS } from "../list-of-scripts.mjs"

const QUICKTEXT_ID = "{8845E3B3-E8FB-40E2-95E9-EC40294818C4}";

browser.runtime.onConnectExternal.addListener(port => {
  port.onMessage.addListener(async info => {
    // Reject message if it it not from Quicktext.
    if (port.sender.id != QUICKTEXT_ID) {
      return;
    }

    if (info.command == "evaluateScript") {
      let { tabId, scriptName, scriptArgs } = info;
      if (!SCRIPTS[scriptName]) {
        return;
      }
      let script = await import(`../scripts/${SCRIPTS[scriptName].file}`)
        .then(imported => imported[scriptName]);

      if (!script) {
        return;
      }

      let scope = {
        quicktext: new scopes.Quicktext(tabId, scriptArgs, port),
        // These scopes map some WebExtension APIs into this.*, so they can be
        // accessed as this.compose.* etc.
        // This is optional and you can use the real APIs instead (browser.compose.*).
        // The reason this is here is: You might copy scripts from elsewhere which
        // were written to be run in Quicktext directly and therefore *do* need
        // these wrappers, as they cannot access most of the browser.* namespace.
        // Such a script will fail if run inside this add-on, if these scopes
        // are not provided and the script is not modified to use browser.* instead
        // of this.*
        compose: new scopes.Compose(tabId),
        messages: new scopes.Messages(),
        identities: new scopes.Identities(),
      }
      let evaluatedScript = await script.call(scope);
      port.postMessage({ command: "evaluatedScript", evaluatedScript });
    }
  });
})

browser.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName != "session" || !changes.quicktext) {
    return;
  }
  if (changes.quicktext.newValue) {
    // Inform QT about us. Older Quicktext versions (< 6.5) expect a simple array
    // of names. Quicktext >= 6.5 supports the new object-based extended format.
    const qtVersion = await getQuicktextVersion();

    await browser.runtime.sendMessage(
      QUICKTEXT_ID,
      {
        register_script_addon: browser.runtime.getManifest().short_name,
        available_scripts: (qtVersion.major < 6 || (qtVersion.major === 6 && qtVersion.minor < 5))
          ? Object.keys(SCRIPTS)
          : SCRIPTS
      }
    );
  }
})

async function getQuicktextVersion() {
  let info = await browser.management.get(QUICKTEXT_ID);
  let [major, minor] = info.version.split(".").map(x => parseInt(x, 10));
  return { major, minor };
}

browser.management.onEnabled.addListener(info => setQuicktextState(info, true));
browser.management.onInstalled.addListener(info => setQuicktextState(info, true));
browser.management.onDisabled.addListener(info => setQuicktextState(info, false));
browser.management.onUninstalled.addListener(info => setQuicktextState(info, false));

let all = await browser.management.getAll();
let info = all.find(e => e.id == QUICKTEXT_ID);
if (info) {
  await setQuicktextState(info, info.enabled);
}

// Update session storage to keep track of Quicktext state. 
async function setQuicktextState(info, state) {
  if (info.id != QUICKTEXT_ID) {
    return;
  }
  await browser.storage.session.set({ quicktext: state });
}

