var blockedSites = [];
var activated;
const btn = document.getElementById('addSite');
const activate = document.getElementById('activate');
const input = document.getElementById('inputField');
const siteContainer = document.querySelector('.sites');
const deleteButton = document.querySelectorAll('.delete');

chrome.storage.sync.get('sites', data => {
    if(typeof data.sites !== 'undefined') {
        blockedSites = data.sites;
        blockedSites.forEach(site => {
            siteContainer.innerHTML += `<div class="website"><div class="address">${site}</div><button class="delete">X</button></div>`
        });
        addDelete();
    }
});

chrome.storage.sync.get('state', data => {
    activated = data.state;
    changeButton();
});

btn.addEventListener('click', () => {
    if(input.value.includes('.') && input.value.length > 1) {
        siteContainer.innerHTML += `<div class="website"><div class="address">${input.value}</div><button class="delete">X</button></div>`
        blockedSites.push(input.value);
        input.value = '';
        addDelete();
        chrome.storage.sync.set({'sites': blockedSites});
    } else {
        const container = document.querySelector('.container');
        const form = document.querySelector('.form');
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Please enter a valid website.';
        container.insertBefore(errorMessage, form);
        setTimeout(() => errorMessage.remove(), 2000);
    }
});

activate.addEventListener('click', () => {
    if(activated) {
        activated = false;
        chrome.storage.sync.set({'state': activated});
        changeButton();
    } else {
        activated = true;
        chrome.storage.sync.set({'state': activated});
        changeButton();
    }
});

function changeButton() {
    if(activated) {
        activate.innerText = 'Deactivate';
        activate.style.backgroundColor = 'red';
    } else {
        activate.innerText = 'Activate';
        activate.style.backgroundColor = 'green';
    }
}

function addDelete() {
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
            console.log(blockedSites.indexOf(button.previousElementSibling.innerText));
            blockedSites.splice(blockedSites.indexOf(button.previousElementSibling.innerText), 1);
            chrome.storage.sync.set({'sites': blockedSites});
        });
    });
}