const actions = localStorage.getItem("actions") ? JSON.parse(localStorage.getItem("actions")) : new Array()

let numberOfActions = localStorage.getItem("numberOfActions") ? parseInt(localStorage.getItem("numberOfActions")) : 0

browser.runtime.onMessage.addListener(parseMessage)

function parseMessage(message, sender, sendResponse) {
    switch (message.request) {
        case "show condensed data":
            fetchCondensedData(sender, sendResponse)
            break;
        case "show detailed data":
            fetchDetailedData(sender, sendResponse)
            break;
        case "fetch condensed data":
            fetchCondensedData(sender, sendResponse)
            break;
        case "fetch detailed data":
            fetchDetailedData(sender, sendResponse)
            break;
        case "fetch browser settings":
            fetchBrowserSettings(sender, sendResponse)
            break;
        default:
            break;
    }
}

function fetchCondensedData(sender, sendResponse) {
    const uniqueUrls = getUniqueUrls(actions)
    const actionsOnDomain = new Array()
    let mouseDownUpPairIndexes = getMouseUpDownPairIndexes(actions)
    let cloneActions = replaceMouseDownUpWithClick(actions, mouseDownUpPairIndexes)
    cloneActions = replaceClicksWithDblClick(cloneActions)
    for (let i = 0; i < uniqueUrls.length; i++) {
        let urlActions = getAllActionsOfUrl(cloneActions, uniqueUrls[i])
        actionsOnDomain.unshift(urlActions)
    }
    sendResponse({ data: actionsOnDomain })
}

function fetchDetailedData(sender, sendResponse) {
    const uniqueUrls = getUniqueUrls(actions)
    const actionsOnDomain = new Array()
    for (let i = 0; i < uniqueUrls.length; i++) {
        let urlActions = getAllActionsOfUrl(actions, uniqueUrls[i])
        actionsOnDomain.unshift(urlActions)
    }
    sendResponse({ data: actionsOnDomain })
}

function fetchBrowserSettings(sender, sendResponse) {
    const browserSettings = getBrowserSettings()
    sendResponse({ data: browserSettings })
}