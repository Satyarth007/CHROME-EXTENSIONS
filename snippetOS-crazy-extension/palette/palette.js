const search = document.getElementById("paletteSearch");
const results = document.getElementById("results");

function load(filter=""){

chrome.storage.local.get(["snippets"],res=>{

let snippets = res.snippets || [];

results.innerHTML="";

snippets
.filter(s=>s.text.toLowerCase().includes(filter.toLowerCase()))
.forEach(snippet=>{

let div=document.createElement("div");

div.className="result";
div.innerText=snippet.text;

div.onclick=()=>{
pasteSnippet(snippet.text);
};

results.appendChild(div);

});

});

}

function pasteSnippet(text){

let active=document.activeElement;

if(active && ("value" in active)){
active.value += text;
}

document.getElementById("snippetPalette").remove();

}

search.addEventListener("input",()=>{
load(search.value);
});

load();
