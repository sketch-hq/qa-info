const sketch = require('sketch')
// documentation: https://developer.sketchapp.com/reference/api/

export default function(context) {
  var appMetadata = MSApplicationMetadata.metadata()
  var sysReport = "```\n"
  sysReport += "Build version: " + appMetadata.build + "\n"
  sysReport += "Build variant: " + appMetadata.variant + "\n"
  sysReport += "OS version: " + NSProcessInfo.processInfo().operatingSystemVersionString() + "\n"
  var cloudPlatform = SCKAPIEnvironment.current().name()
  var cloudEnabled = MSCloudAction.cloudEnabled()
  if (!cloudEnabled) {
    cloudPlatform = "(disabled)"
  }
  sysReport += "Cloud: " + cloudPlatform + "\n"
  sysReport += "```\n"

  if (sysReport) {
    var pasteBoard = NSPasteboard.generalPasteboard()
    pasteBoard.clearContents()
    pasteBoard.writeObjects([sysReport])
    sketch.UI.message("Sketch app info copied to Clipboard")
  } else {
    sketch.UI.message("Uh, oh, something’s wrong here!")
  }
}
