var blockedSites = [];
const url = window.location.href;

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncSites);
} else {
    syncSites();
}

function syncSites() {
    chrome.storage.sync.get('sites', data => {
        if(typeof data.sites !== 'undefined') {
            blockedSites = data.sites;
            checkActivated();
        }
    });
}

function checkActivated() {
    chrome.storage.sync.get('state', data => {
        if(data.state) {
            checkURL();
        }
    });
}

function checkURL() {
    for(let i = 0; i < blockedSites.length; i++) {
        if (url.includes(blockedSites[i])) {
            render();
            break;
        }
    }
}

function render() {
    var body = document.querySelector('body');
    var header = document.createElement('h1');
    body.innerHTML = '';
    header.innerText = 'Sorry, this is a blocked site.';
    header.style.color = 'white';
    header.style.textAlign = 'center';
    header.style.marginTop = '50px';
    body.appendChild(header);
    body.style.backgroundColor = "black";
}