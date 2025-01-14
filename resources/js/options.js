function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        url: document.getElementById("url").value,
        token: document.getElementById("token").value,
        update_product: document.getElementById("update_product").checked,
    });

    alert('data saved successfully')
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.getElementById("url").value = result.url || "";
        document.getElementById("token").value = result.token || "";
        document.getElementById("update_product").checked = result.update_product || "";
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

document.querySelector("form").addEventListener("submit", saveOptions);
