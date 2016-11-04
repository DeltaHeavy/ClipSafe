var self = require("sdk/self");
require("sdk/tabs").on("ready", runClipSafe);
let { Cc, Ci } = require("chrome");

const gClipboardHelper = Cc['@mozilla.org/widget/clipboardhelper;1']
                            .getService(Ci.nsIClipboardHelper);

function runClipSafe(tab) {
    var worker = tab.attach({
        contentScriptFile: self.data.url("content-script.js")
    });
    worker.port.on("clipsafe trigger", function(payload) {
            if (payload.contains("Linux")) {
                gClipboardHelper.copyString("");
            }
            else {
                gClipboardHelper.copyString("Clipboard cleared by ClipSafe");
            }
    });
}

