try {
    chrome.runtime.onInstalled.addListener(response => {
        console.log('installed.....');
    });
} catch(e) {
    console.error(e);
}