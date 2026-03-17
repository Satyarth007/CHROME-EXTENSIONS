chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "openPalette") {
    if (document.getElementById("snippetPalette")) return;

    fetch(chrome.runtime.getURL("palette/palette.html"))
      .then(res => res.text())
      .then(html => {

        let div = document.createElement("div");
        div.id = "snippetPalette";
        div.innerHTML = html;
        document.body.appendChild(div);

        let css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = chrome.runtime.getURL("palette/palette.css");
        document.head.appendChild(css);

        let script = document.createElement("script");
        script.src = chrome.runtime.getURL("palette/palette.js");
        document.body.appendChild(script);
      });
  }
});
