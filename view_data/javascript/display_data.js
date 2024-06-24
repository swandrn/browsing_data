function displayBrowserSettings(browserSettings){
    const browserSettingsDiv = document.querySelector("#browser-settings")

    const userAgentDisplay = document.querySelector("#user-agent")
    const screenSizeDisplay = document.querySelector("#screen-size")

    userAgentDisplay.textContent += ` ${browserSettings.userAgent}`
    screenSizeDisplay.textContent += ` ${browserSettings.browserSize}`

    browserSettingsDiv.append(userAgentDisplay)
    browserSettingsDiv.append(screenSizeDisplay)
}

function displayCondensedData(actionsOnDomain) {
    const pages = getPages(actionsOnDomain)

    for (let i = 0; i < pages.length; i++) {
        const heading = document.createElement('h3')
        heading.textContent = pages[i].title
        dataDisplay.append(heading)
        for (let actionIndex = actionsOnDomain[i].length - 1; actionIndex >= 0; actionIndex--) {
            const p = document.createElement('p')

            const action = actionsOnDomain[i][actionIndex]

            //In case of a dblclick
            if (action.action == "dblclick") {
                p.textContent = `
                ${action.action}\r\n
                ${action.firstId}\r\n
                ${action.secondId}\r\n
                ${action.page.title}\r\n
                ${action.firstMouseCoord.x}\r\n
                ${action.firstMouseCoord.y}\r\n
                ${action.firstClickTarget}\r\n
                ${action.secondMouseCoord.x}\r\n
                ${action.secondMouseCoord.y}\r\n
                ${action.secondClickTarget}\r\n
                ${action.actionTime}\r\n
                ${action.dblclickTime}ms\r\n
                `
            }

            //In case of a click
            if (action.action == "click") {
                p.textContent = `
                ${action.action}\r\n
                ${action.id}\r\n
                ${action.page.title}\r\n
                ${action.beginMouseCoord.x}\r\n
                ${action.beginMouseCoord.y}\r\n
                ${action.mouseDownTarget}\r\n
                ${action.endMouseCoord.x}\r\n
                ${action.endMouseCoord.y}\r\n
                ${action.mouseUpTarget}\r\n
                ${action.actionTime}\r\n
                ${action.clickTime}ms\r\n
                `
            }

            //In case of mousedown/mouseup
            if (action.action == "mousedown" || action.action == "mouseup") {
                p.textContent = `
                    ${action.action}\r\n
                    ${action.id}\r\n
                    ${action.page.title}\r\n
                    ${action.mouseCoord.x}\r\n
                    ${action.mouseCoord.y}\r\n
                    ${action.target}\r\n
                    ${action.actionTime}\r\n
                    `
            }

            //In case of scroll
            if(action.action == "scroll"){
                p.textContent = `
                    ${action.action}\r\n
                    ${action.direction}\r\n
                    ${action.id}\r\n
                    ${action.page.title}\r\n
                    ${action.heightScrolled}\r\n
                    ${action.currentHeight}\r\n
                    ${action.actionTime}\r\n
                    `
            }

            dataDisplay.append(p)
        }
    }
}

function displayDetailedData(actionsOnDomain) {
    const pages = getPages(actionsOnDomain)

    for (let i = 0; i < pages.length; i++) {
        const heading = document.createElement('h3')
        heading.textContent = pages[i].title
        dataDisplay.append(heading)
        for (let actionIndex = actionsOnDomain[i].length - 1; actionIndex >= 0; actionIndex--) {
            const p = document.createElement('p')
            const action = actionsOnDomain[i][actionIndex]

            if (action.action == "mousedown" || action.action == "mouseup") {
                p.textContent = `
                    ${action.action}\r\n
                    ${action.id}\r\n
                    ${action.page.title}\r\n
                    ${action.mouseCoord.x}\r\n
                    ${action.mouseCoord.y}\r\n
                    ${action.target}\r\n
                    ${action.actionTime}\r\n
                    `
            }

            if(action.action == "scroll"){
                p.textContent = `
                    ${action.action}\r\n
                    ${action.direction}\r\n
                    ${action.id}\r\n
                    ${action.page.title}\r\n
                    ${action.heightScrolled}\r\n
                    ${action.currentHeight}\r\n
                    ${action.actionTime}\r\n
                    `
            }

            dataDisplay.append(p)
        }
    }
}