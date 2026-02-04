// setting some vars
var packages = [];
var currScrnshots = [];
var currIndex = 0;

// filter function
function inArray(str) {
	let exclude = ['Filename', 'Depiction', 'SileoDepiction', 'SHA1', 'SHA512'];
	return !exclude.includes(str);
}

// convert function
function formatBytes(a, b = 2) {
	if ( ! + a )
		return "0 Bytes";
	const c = 0 > b ? 0 : b , d = Math.floor(Math.log(a) / Math.log(1024));
	return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]}`
}

function download(url)
{
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function getPackageDetails(pkgName)
{
    // Clear first anything on the div element
    const tweakInfo = document.querySelector("div.tweak-info");
    tweakInfo.innerHTML = '';

    var shrtDesc = '';
    var pkgLink = '';

    // Fetch depictions for Sileo and similar (bc why not)
    const details = await fetch(`depictions/native/${pkgName}/depiction.json`).then((res) => res.json());
    
    // Create the banner view
    const bannerView = document.createElement("div");
    bannerView.classList.add("depict-banner");
    
    const imageStatus = await fetch(details.headerImage).then((res) => res.status == 200);
    
    if (imageStatus)
    {
        const bannerImage = document.createElement("img");
        bannerImage.src = details.headerImage;
        bannerView.appendChild(bannerImage);
    } else {
        bannerView.style.backgroundColor = details.tintColor;
    }

    tweakInfo.appendChild(bannerView);

    // Then, create the header view
    const headerView = document.createElement("div");
    headerView.classList.add("depict-header");
    const headerText = document.createElement("div");
    headerText.classList.add("depict-header-text");
    
    const tweakName = document.createElement("span");
    tweakName.classList.add("depict-name");

    const tweakCont = document.createElement("span");
    tweakCont.classList.add("depict-contributor");
    
    for (pkg of packages) {
        if (pkg.Package == pkgName) {
            tweakName.textContent = pkg.Name;
            tweakCont.textContent = pkg.Maintainer;
            shrtDesc = pkg.Description;
            pkgLink = pkg.Filename;
            break;
        }
    }

    headerText.appendChild(tweakName);
    headerText.appendChild(tweakCont);

    const getButton = document.createElement("button");
    getButton.classList.add("depict-button");
    getButton.textContent = "GET";
    getButton.style.backgroundColor = details.tintColor;
    getButton.onclick = () => download(pkgLink);

    headerView.appendChild(headerText);
    headerView.appendChild(getButton);

    tweakInfo.appendChild(headerView);

    var screenshots = [];
    var markdown = "";
    var tableCells = [];

    // Then, create the screenshots view, if any
    
    for (view of details.tabs[0].views)
    {
        if (view.class == 'DepictionScreenshotsView')
        {
            for (srsht of view.screenshots)
            {
                screenshots.push(srsht.url);
            }
        }
        if (view.class == 'DepictionMarkdownView')
        {
            markdown = view.markdown;
        }
        if (view.class == 'DepictionTableTextView')
        {
            tableCells.push(
                [view.title, view.text]
            );
        }
    }

    if (screenshots.length > 0) {
        const screenshotsView = document.createElement("div");
        screenshotsView.classList.add("depict-screenshots");

        for (s of screenshots)
        {
            const image = document.createElement("img");
            image.src = s;

            image.addEventListener("click", (e) => {
                for (img of e.target.parentNode.childNodes)
                {
                    currScrnshots.push(img.src);
                }

                currIndex = currScrnshots.indexOf(e.target.src);
                document.querySelector("div.image-viewer").setAttribute("state", "1");
                updateImageViewer();
            });

            screenshotsView.appendChild(image);
        }

        tweakInfo.appendChild(screenshotsView);
    }

    // Then, create the information view
    const infoView = document.createElement("div");
    infoView.classList.add("depict-info");

    if (markdown != '') {
        const md = window.markdownit(); // ensure MarkdownIt is installed
        infoView.innerHTML = md.render(markdown);
    } else {
        infoView.innerText = shrtDesc;
    }

    tweakInfo.appendChild(infoView);

    // Then, the depiction table view
    if (tableCells.length > 0)
    {
        const extrasView = document.createElement("div");
        extrasView.classList.add("depict-extras");

        const tableView = document.createElement("table");

        for (tableCell of tableCells)
        {
            const row = document.createElement("tr");
            const tableTitle = document.createElement("td");
            tableTitle.textContent = tableCell[0];

            const tableValue = document.createElement("td");
            const spanNode = document.createElement("span");
            spanNode.textContent = tableCell[1];
            tableValue.appendChild(spanNode);

            row.appendChild(tableTitle);
            row.appendChild(tableValue);

            tableView.appendChild(row);
        }

        extrasView.appendChild(tableView);
        tweakInfo.appendChild(extrasView);
    }
}

async function fetchPackages()
{
    var array = [];
    await fetch('Packages').then(
        (res) => res.text()
    ).then(
        (text) => {
            array = text.split('\n');
            var package = {};

            for (let str of array)
            {
                if (str != '')
                {
                    package[str.split(/:\s/gm)[0]] = str.split(/:\s/gm)[1];
                } else {
                    packages.push(new Object(package));
                    package = {};
                }
            }

            // Remove the last array entry because it got parsed despite null
            packages.pop();
        }
    )

    array = [];

    const tweakList = document.querySelector("div.tweak-list");
    for (pkg of packages)
    {
        // Create the tweak-entry division
        const tweakEntry = document.createElement("div");
        tweakEntry.classList.add("tweak-entry");
        tweakEntry.setAttribute("state", "0");
        tweakEntry.id = pkg.Package.split(".")[2];

        tweakEntry.addEventListener("click", async (e) => {
            var targetElement;

            // If the click event registered was a decendant of a tweak-entry div
            if (e.target.id == '')
            {   
                var x = e.target;
                while (x = x.parentNode) {
                    if (x.id != '') { targetElement = x; break; }
                }
            } else {
                targetElement = e.target;
            }

            const targetEntry = document.querySelector(`div.tweak-entry#${targetElement.id}`);
            document.querySelectorAll("div.tweak-entry").forEach(
                (v) => (v != targetEntry) ? v.setAttribute("state", "0") : null
            );
            targetEntry.setAttribute("state", "1");

            await getPackageDetails(`${pkg.Package.split(".")[0]}.${pkg.Package.split(".")[1]}.${targetElement.id}`);
            document.querySelector("button#share").style.display = '';
            document.querySelector("button#share").onclick = async () => {
                const shareData = {
                    title: pkg.Name,
                    text: pkg.Description,
                    url: `https://creativegamer03.github.io/repo?pkg=${pkg.Package}`
                }
                
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    window.alert(`Share failed. Error: ${err}`);
                }

            };
        });

        // Then, create the tweak-icon image
        const tweakIcon = document.createElement("img");
        tweakIcon.classList.add("tweak-icon");
        tweakIcon.src = pkg.Icon;

        // And finally the tweak details division
        const tweakDetails = document.createElement("div");
        tweakDetails.classList.add("tweak-details");

        const tweakLabel = document.createElement("span");
        tweakLabel.classList.add("tweak-label");
        tweakLabel.textContent = pkg.Name;
        
        const tweakType = document.createElement("span");
        tweakType.classList.add("tweak-type");
        tweakType.textContent = pkg.Section;

        const tweakSize = document.createElement("span");
        tweakSize.classList.add("tweak-size");
        tweakSize.textContent = formatBytes(pkg.Size);

        // Append them all into the tweak list
        tweakDetails.appendChild(tweakLabel);
        tweakDetails.appendChild(tweakType);
        tweakDetails.appendChild(tweakSize);

        tweakEntry.appendChild(tweakIcon);
        tweakEntry.appendChild(tweakDetails);

        tweakList.appendChild(tweakEntry);
    }
}

function updateImageViewer() {
    if (document.querySelector("div.image-viewer").getAttribute("state") == "1")
    {
        document.querySelector("img#img-viewer-container").src = currScrnshots[currIndex];

        if (currScrnshots.length == 1)
        {
            document.querySelector("button#prev-img").disabled = true;
            document.querySelector("button#next-img").disabled = true;
        }

        if (currIndex == 0) {
            document.querySelector("button#prev-img").disabled = true;
            document.querySelector("button#next-img").disabled = false;
        }

        if (currIndex == currScrnshots.length - 1) {
            document.querySelector("button#prev-img").disabled = false;
            document.querySelector("button#next-img").disabled = true;
        }

        if (currIndex > 0 && currIndex < currScrnshots.length - 1)
        {
            document.querySelector("button#prev-img").disabled = false;
            document.querySelector("button#next-img").disabled = false;
        }

    } else {
        document.querySelector("img#img-viewer-container").src = '';
        currIndex = 0;
        currScrnshots = [];
        document.querySelector("button#prev-img").disabled = false;
        document.querySelector("button#next-img").disabled = false;
    }
}

document.querySelector("button#prev-img").addEventListener("click", (e) => { 
    if (currIndex > 0 && currIndex <= currScrnshots.length - 1) {
        currIndex--;
    } else {
        currIndex = 0;
    }

    updateImageViewer();
});

document.querySelector("button#next-img").addEventListener("click", (e) => { 
    if (currIndex >= 0 && currIndex < currScrnshots.length - 1) {
        currIndex++;
    } else {
        currIndex = currScrnshots.length - 1;
    }

    updateImageViewer();
});

document.querySelector("div.image-viewer").addEventListener("click", (e) => {
    if (e.target == document.querySelector("div.image-viewer")) {
        document.querySelector("div.image-viewer").setAttribute("state", "0");
        updateImageViewer();
    }
});

document.querySelector("button#sileo").onclick = () => {
    window.location.href = "sileo://source/https://creativegamer03.github.io/repo/";
}

document.querySelector("button#zebra").onclick = () => {
    window.location.href = "zbra://sources/https://creativegamer03.github.io/repo/";
}

document.querySelector("span#close").onclick = () => {
    window.location.href = "..";
}

// helper function to auto-select the tweak specified in url
function selectFromURLParam() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pkg') != null) {
        const pkgName = urlParams.get('pkg').split(".")[2];
        document.querySelector(`div.tweak-entry#${pkgName}`).click();
    }
}

window.onload = async () => { await fetchPackages(); document.querySelector("button#share").style.display = 'none'; selectFromURLParam(); };