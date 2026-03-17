chrome.commands.onCommand.addListener((command) => {
  if (command === "open_palette") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "openPalette" });
    });
  }
});
