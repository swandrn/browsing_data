const showDataButton = document.querySelector("#show-data-button")
const detailedDataButton = document.querySelector("#detailed-data-button")
const downloadCondensedDataButton = document.querySelector("#download-data-button")
const downloadDetailedDataButton = document.querySelector("#download-detailed-data-button")

const dataDisplay = document.querySelector("#data")

let getCurrentTab = browser.tabs.query({
    currentWindow: true,
    active: true
})

function askToShowCondensedData(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
        request: "show condensed data"
    }).then(showCondensedDataResponse, refreshDataError)
}

function showCondensedDataResponse(message) {
    const actionsOnDomain = message.data
    dataDisplay.textContent = ""
    displayCondensedData(actionsOnDomain)
}

function askToShowDetailedData(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
        request: "show detailed data"
    }).then(showDetailedDataResponse, refreshDataError)
}

function showDetailedDataResponse(message) {
    const actionsOnDomain = message.data
    dataDisplay.textContent = ""
    displayDetailedData(actionsOnDomain)
}

function fetchCondensedData(tabs){
    browser.tabs.sendMessage(tabs[0].id, {
        request: "fetch condensed data"
    }).then(fetchCondensedDataResponse, fetchDataError)
    .then(function(actionsOnDomain){
        let csv = arrayToCsv(actionsOnDomain)
        let url = actionsOnDomain[0][0].page.url
        let filename = "condensed-" + generateCsvFilename(url)
        downloadBlob(csv, filename, 'text/csv;charset=utf-8;')
    }, downloadError)
}

function fetchCondensedDataResponse(message){
    return message.data
}

function fetchDetailedData(tabs){
    browser.tabs.sendMessage(tabs[0].id, {
        request: "fetch detailed data"
    }).then(fetchDetailedDataResponse, fetchDataError)
    .then(function(actionsOnDomain){
        let csv = arrayToCsv(actionsOnDomain)
        let url = actionsOnDomain[0][0].page.url
        let filename =  "detailed-" + generateCsvFilename(url)
        downloadBlob(csv, filename, 'text/csv;charset=utf-8;')
    }, downloadError)
}

function fetchDetailedDataResponse(message){
    return message.data
}

//Errors

function onTabError(error) {
    dataDisplay.textContent = `error querying the tabs: ${error.message}`
}

function refreshDataError(error) {
    dataDisplay.textContent = `error refreshing data: ${error.message}`
}

function fetchDataError(error) {
    dataDisplay.textContent = `error fetching data: ${error.message}`
}

function downloadError(error) {
    dataDisplay.textContent = `error downloading data: ${error.message}`
}

function displayBrowserSettingsError(error) {
    const userAgentDisplay = document.querySelector("#user-agent")
    const screenSizeDisplay = document.querySelector("#screen-size")
    userAgentDisplay.textContent = `error displaying browser settings: ${error.message}`
    screenSizeDisplay.textContent = `error displaying browser settings: ${error.message}`
}

//Event listeners

showDataButton.addEventListener('click', function () {
    getCurrentTab.then(askToShowCondensedData, onTabError)
})

detailedDataButton.addEventListener('click', function () {
    getCurrentTab.then(askToShowDetailedData, onTabError)
})

downloadCondensedDataButton.addEventListener('click', function(){
    getCurrentTab.then(fetchCondensedData, onTabError)
})

downloadDetailedDataButton.addEventListener('click', function(){
    getCurrentTab.then(fetchDetailedData, onTabError)
})

//On popup opening

function fetchBrowserSettings(tabs){
    browser.tabs.sendMessage(tabs[0].id, {
        request: "fetch browser settings"
    }).then(fetchBrowserSettingsResponse, fetchDataError)
    .then(displayBrowserSettings, displayBrowserSettingsError)    
}

function fetchBrowserSettingsResponse(message){
    return message.data
}

getCurrentTab.then(fetchBrowserSettings)