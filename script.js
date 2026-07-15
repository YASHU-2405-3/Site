// ===================================
// MY MEDIA HUB
// script.js - PART 1
// ===================================

const cards = document.getElementById("cards");
const addCard = document.getElementById("addCard");

// Convert YouTube Link to Embed
function convertYouTube(url){

    if(url.includes("watch?v=")){
        return url.replace("watch?v=","embed/");
    }

    if(url.includes("youtu.be/")){
        return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1];
    }

    return url;

}

// Create Card HTML
function createCard(data={}){

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<div class="left">

<input class="title"
placeholder="Video Title"
value="${data.title || ""}">

<textarea class="description"
placeholder="Write about this video">${data.description || ""}</textarea>

<input class="website"
placeholder="https://example.com"
value="${data.website || ""}">

</div>

<div class="right">

<input class="videoLink"
placeholder="Paste Video Link"
value="${data.video || ""}">

<iframe
class="video"
src="${convertYouTube(data.video || "")}"
allowfullscreen>
</iframe>

<button class="open">
🌐 Open Website
</button>

<button class="delete">
🗑 Delete
</button>

</div>

`;

cards.appendChild(card);

setupCard(card);

}

// Setup Card Events
function setupCard(card){

const title=card.querySelector(".title");
const description=card.querySelector(".description");
const website=card.querySelector(".website");
const videoLink=card.querySelector(".videoLink");
const video=card.querySelector(".video");
const open=card.querySelector(".open");
const del=card.querySelector(".delete");

videoLink.addEventListener("input",()=>{

video.src=convertYouTube(videoLink.value);

saveData();

});

open.onclick=()=>{

if(website.value.trim()){

window.open(website.value,"_blank");

}else{

alert("Website Link Missing");

}

};

del.onclick=()=>{

card.remove();

saveData();

};

title.addEventListener("input",saveData);
description.addEventListener("input",saveData);
website.addEventListener("input",saveData);

}
// ===================================
// MY MEDIA HUB
// script.js - PART 2
// Save / Load (LocalStorage)
// ===================================

// Save All Cards
function saveData(){

const data=[];

document.querySelectorAll(".card").forEach(card=>{

data.push({

title:card.querySelector(".title").value,

description:card.querySelector(".description").value,

website:card.querySelector(".website").value,

video:card.querySelector(".videoLink").value

});

});

localStorage.setItem(
"mediaHubData",
JSON.stringify(data)
);

}

// Load All Cards
function loadData(){

const data=JSON.parse(
localStorage.getItem("mediaHubData")
);

cards.innerHTML="";

if(data && data.length){

data.forEach(item=>{

createCard(item);

});

}else{

createCard();

}

}

// Auto Save
document.addEventListener("input",()=>{

saveData();

});
// ===================================
// MY MEDIA HUB
// script.js - PART 3
// Add Card + Load App
// ===================================

// Add New Card
addCard.addEventListener("click",()=>{

createCard();

saveData();

});

// Start App
window.addEventListener("load",()=>{

loadData();

});

// Auto Save Every 5 Seconds
setInterval(()=>{

saveData();

},5000);

// Keyboard Shortcut
document.addEventListener("keydown",(e)=>{

// Ctrl + N = New Card
if(e.ctrlKey && e.key.toLowerCase()=="n"){

e.preventDefault();

createCard();

saveData();

}

});
// ===================================
// MY MEDIA HUB
// script.js - PART 4
// Search + Pin
// ===================================

// Search Box
const search = document.createElement("input");

search.type = "text";
search.placeholder = "🔍 Search...";

search.style.width = "90%";
search.style.margin = "20px auto";
search.style.display = "block";
search.style.padding = "15px";
search.style.borderRadius = "12px";
search.style.border = "none";

document.body.insertBefore(search, cards);

// Search Cards
search.addEventListener("input",()=>{

const value = search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const title = card.querySelector(".title").value.toLowerCase();

const desc = card.querySelector(".description").value.toLowerCase();

if(title.includes(value) || desc.includes(value)){

card.style.display = "flex";

}else{

card.style.display = "none";

}

});

});

// Add Pin Button
function addPinButtons(){

document.querySelectorAll(".card").forEach(card=>{

if(card.querySelector(".pin")) return;

const pin = document.createElement("button");

pin.className = "pin";

pin.innerHTML = "📌 Pin";

pin.onclick = ()=>{

cards.prepend(card);

saveData();

};

card.querySelector(".right").appendChild(pin);

});

}

addPinButtons();

// Watch New Cards
const observer = new MutationObserver(()=>{

addPinButtons();

});
