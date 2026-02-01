const linkDict = {
    "archives": "/archive",
    "projects": "/others/projects",
    "return": "/"
}

var currentIndex = 0;

function updateItem() {
    const options = document.querySelectorAll("div.menu-table tr:not(.pad)");

    for (i = 0; i < options.length; i++)
    {
        if (options[i].getAttribute("state") == '1')
        {
            options[i].setAttribute("state", "0");
        }
    }

    options[currentIndex].setAttribute("state", "1");

    document.querySelector('[state="1"] td').firstChild.textContent = "*";
    document.querySelectorAll('[state="0"] td').forEach((v) => v.firstChild.textContent = "\u{a0}");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        if ((currentIndex >= 0) && (currentIndex < document.querySelectorAll("div.menu-table tr:not(.pad)").length - 1)) currentIndex++;
        else currentIndex = document.querySelectorAll("div.menu-table tr:not(.pad)").length - 1; 
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        if ((currentIndex > 0) && (currentIndex <= document.querySelectorAll("div.menu-table tr:not(.pad)").length - 1)) currentIndex--;
        else currentIndex = 0;
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const selectedItem = document.querySelectorAll("div.menu-table tr:not(.pad)")[currentIndex];
        window.location.pathname = linkDict[selectedItem.id];
    }
});

document.querySelectorAll("div.menu-table tr:not(.pad)").forEach(
    (v) => v.addEventListener("click", () => window.location.pathname = linkDict[v.id])
);

document.querySelectorAll("div.menu-table tr:not(.pad)").forEach(
    (v) => v.addEventListener("mouseenter", function(){
        const options = document.querySelectorAll("div.menu-table tr:not(.pad)");

        for (i = 0; i < options.length; i++)
        {
            if (v == options[i]) currentIndex = i;
        }
        
        updateItem();
    })
);

window.onload = function() {
    this.document.querySelector("div.main-ui").style.display = '';
    this.document.querySelector("div.boot-img").style.display = 'none';
    updateItem();
};