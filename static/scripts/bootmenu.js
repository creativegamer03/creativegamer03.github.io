const linkDict = {
    "github": "https://github.com/creativegamer03",
    "ios": "/repo",
    "rw": "/rwmods",
    "others": "/others",
    "about": "/about.html"
}

var currentIndex = 0;

function updateItem() {
    const options = document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)");

    for (i = 0; i < options.length; i++)
    {
        if (options[i].getAttribute("state") == '1')
        {
            options[i].setAttribute("state", "0");
        }
    }

    options[currentIndex].setAttribute("state", "1");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        if ((currentIndex >= 0) && (currentIndex < document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)").length - 1)) currentIndex++;
        else currentIndex = document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)").length - 1; 
    }
    updateItem();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        if ((currentIndex > 0) && (currentIndex <= document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)").length - 1)) currentIndex--;
        else currentIndex = 0;
    }
    updateItem();
});

document.addEventListener("keydown", async(e) => {
    if (e.key === "Enter") {
        document.querySelector("div.main-ui").style.display = 'none';
        document.querySelector("div.error").style.display = 'unset';

        await new Promise(r => setTimeout(r, 500));

        const selectedItem = document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)")[currentIndex];
        window.location.href = linkDict[selectedItem.id];
    }
});

document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)").forEach(
    (v) => v.addEventListener("click", async(e) => {
        document.querySelector("div.main-ui").style.display = 'none';
        document.querySelector("div.error").style.display = 'unset';

        await new Promise(r => setTimeout(r, 500));

        window.location.href = linkDict[v.id];
    })
);

document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)").forEach(
    (v) => v.addEventListener("mouseenter", function(){
        const options = document.querySelectorAll("div.menu-table tbody.the-stuff tr:not(.pad)");

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