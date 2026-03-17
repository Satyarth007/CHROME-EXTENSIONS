const saveBtn = document.getElementById("saveBtn");
const textArea = document.getElementById("snippetText");
const category = document.getElementById("category");
const container = document.getElementById("snippetContainer");

function loadSnippets(){

chrome.storage.local.get(["snippets"], res=>{

let snippets = res.snippets || [];
container.innerHTML="";

snippets.forEach((snippet,index)=>{

let div=document.createElement("div");
div.className="snippet";

div.innerHTML=`
<div><b>${snippet.category}</b></div>
<div>${snippet.text}</div>

<div class="actions">
<button class="copy">Copy</button>
<button class="delete">Delete</button>
</div>
`;

div.querySelector(".copy").onclick=()=>{
navigator.clipboard.writeText(snippet.text);
};

div.querySelector(".delete").onclick=()=>{

snippets.splice(index,1);

chrome.storage.local.set({snippets},()=>{
loadSnippets();
});

};

container.appendChild(div);

});

});

}

saveBtn.onclick=()=>{

const text=textArea.value.trim();
if(!text) return;

chrome.storage.local.get(["snippets"],res=>{

let snippets=res.snippets || [];

snippets.push({
text:text,
category:category.value
});

chrome.storage.local.set({snippets},()=>{
textArea.value="";
loadSnippets();
});

});

};

loadSnippets();
