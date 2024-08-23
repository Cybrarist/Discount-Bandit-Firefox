function saveOptions(e) {

    e.preventDefault();
    browser.storage.sync.set({
        url: document.querySelector("#url").value,
        token: document.querySelector("#token").value,
        update_product: document.querySelector("#update_product").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#url").value = result.url || "";
        document.querySelector("#token").value = result.token || "";
        document.querySelector("#update_live_product").value = result.update_product || "";
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
