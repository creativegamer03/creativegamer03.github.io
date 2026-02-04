const linkDict = {
    "github": "https://github.com/creativegamer03",
    "reddit": "https://reddit.com/u/creativegamer03",
    "discord": "https://discordapp.com/users/561112319933939714",
    "bluesky": "https://bsky.app/profile/creativegamer03.bsky.social",
    "youtube": "https://www.youtube.com/@creativegamer_03",
    "platformjs": "https://github.com/bestiejs/platform.js",
    "sperryfont": "https://int10h.org/oldschool-pc-fonts/fontlist/font?sperrypc_8x16"
}

const descDict = {
    "github": "This is my GitHub account, where I share software stuff that I make for fun. @creativegamer03",
    "reddit": "This is my Reddit account. I'm usually active here. You can contact here if you want. u/creativegamer03",
    "discord": "This is my Discord account. I'm also active here. Currently, DMs are off unfortunately. @creativegamer_03",
    "bluesky": "This is my Bluesky account. I've switched off from Twitter/X since. I usually post stuff I like to share when I feel like it. DMs open. @creativegamer03.bsky.social",
    "youtube": "This is my YouTube channel. I barely post videos here because I don't usually make videos a lot, but I do post them when I feel like sharing it for fun or if it's useful/interesting. @creativegamer_03",
    "website": "This is my website, hosted as a GitHub Pages site for my GitHub repo. It currently houses some small projects of mine, my Rain World mods, and my iOS tweaks. I might clean up the site some time, but for now I've decided to just upgrade the look a bit.",
    "platformjs": "Platform.js was used for this web page only. JS Library by BestieJS Modules.",
    "sperryfont": "Sperry 8x16 font was obtained from The Oldschool PC Font Resource. Used as the global font for this site."
}

const tabLabels = ["about", "credits"];

var currentIndex = 0;
var currentTab = 0;

function updateItem() {
    const options = document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`);
    const tabs = document.querySelectorAll("div.header-tabs span");

    for (i = 0; i < options.length; i++)
    {
        if (options[i].getAttribute("state") == '1')
        {
            options[i].setAttribute("state", "0");
        }
    }

    for (i = 0; i < tabs.length; i++)
    {
        if (tabs[i].getAttribute("state") == '1')
        {
            document.querySelectorAll(`div#${tabLabels[i]}`).forEach((e) => e.setAttribute("state", "0"));
            tabs[i].setAttribute("state", "0");
        }
    }

    if (currentIndex > options.length) currentIndex = 0;
    if (options.length > 0) options[currentIndex].setAttribute("state", "1");
    tabs[currentTab].setAttribute("state", "1");
    document.querySelectorAll(`div#${tabLabels[currentTab]}`).forEach((e) => e.setAttribute("state", "1"));

    const description = document.querySelector("div.description");

    description.textContent = descDict[options[currentIndex].id];
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        if ((currentTab > 0) && (currentTab <= document.querySelectorAll("div.header-tabs span").length - 1)) currentTab--;
        else currentTab = 0; 
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        if ((currentTab >= 0) && (currentTab < document.querySelectorAll("div.header-tabs span").length - 1)) currentTab++;
        else currentTab = document.querySelectorAll("div.header-tabs span").length - 1; 
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        if ((currentIndex >= 0) && (currentIndex < document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`).length - 1)) currentIndex++;
        else currentIndex = document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`).length - 1; 
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        if ((currentIndex > 0) && (currentIndex <= document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`).length - 1)) currentIndex--;
        else currentIndex = 0;
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const selectedItem = document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`)[currentIndex];
        if (linkDict[selectedItem.id] != undefined) window.location.href = linkDict[selectedItem.id];
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "F4") {
        window.location.href = "/";
    }
});

document.querySelectorAll("li.link-text").forEach(
    (v) => v.addEventListener("click", () => window.location.href = linkDict[v.id])
);

document.querySelectorAll("div.header-tabs span").forEach(
    (v, k) => v.addEventListener("click", () => {currentTab = k; currentIndex = 0; updateItem();})
);

document.querySelectorAll("li.link-text").forEach(
    (v) => v.addEventListener("mouseenter", function(){
        const options = document.querySelectorAll(`div#${tabLabels[currentTab]} li.link-text`);

        for (i = 0; i < options.length; i++)
        {
            if (v == options[i]) currentIndex = i;
        }
        
        updateItem();
    })
);

function dateAndTime() {
    const dateElement = document.querySelector("li#date");
    const timeElement = document.querySelector("li#time");

    var d = new Date();

    dateElement.textContent = "[" + d.toLocaleString('en-GB', {
        weekday: "short", month: "2-digit", day: "2-digit", year: "numeric"
    }).replace(",", "") + "]";

    timeElement.textContent = "[" +  d.toLocaleString('en-US', {
        hour: '2-digit', minute: '2-digit', second:'2-digit', hour12: false
    }) + "]";
}

function addInfo() {
    document.getElementById("browser-name").textContent = platform.name;
    document.getElementById("browser-version").textContent = platform.version;
    document.getElementById("os").textContent = platform.os.toString();
}

window.onload = function() { updateItem(); dateAndTime(); addInfo(); setInterval(dateAndTime, 1000); };