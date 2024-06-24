function getPages(actionsOnDomain) {
    const pages = new Array()
    for (let i = 0; i < actionsOnDomain.length; i++) {
        let page = actionsOnDomain[i][0].page
        pages.push(page)
    }
    return pages
}

function arrayToCsv(actionsOnDomain){
    let arrayOfActionsPerDomain = actionsOnDomain.map((row) => row
    .map((obj) => {
        if(obj.action === "mousedown" || obj.action === "mouseup"){
            return new Array(
                String(obj.page.title),
                String(obj.page.url),
                String(obj.action),
                String(obj.id),
                String(obj.target),
                String(obj.mouseCoord.x),
                String(obj.mouseCoord.y),
                String(obj.actionTime),
            )
        }

        if(obj.action === "click"){
            return new Array(
                String(obj.page.title),
                String(obj.page.url),
                String(obj.action),
                String(obj.id),
                String(obj.mouseDownTarget),
                String(obj.mouseUpTarget),
                String(obj.beginMouseCoord.x),
                String(obj.beginMouseCoord.y),
                String(obj.endMouseCoord.x),
                String(obj.endMouseCoord.y),
                String(obj.actionTime),
                String(obj.clickTime),
            )
        }

        if(obj.action === "scroll"){
            return new Array(
                String(obj.page.title),
                String(obj.page.url),
                String(obj.action),
                String(obj.direction),
                String(obj.id),
                String(obj.heightScrolled),
                String(obj.actionTime),
            )
        }
    })
    .map((arrOfActions) => arrOfActions
    .map((value) => value.replaceAll('"', '""'))
    .map((value) => `"${value}"`)
    .join(",")))

    let csvContent = new Array()

    for(let i = 0; i < arrayOfActionsPerDomain.length; i++){
        for(let j = 0; j < arrayOfActionsPerDomain[i].length; j++){
            csvContent.unshift(arrayOfActionsPerDomain[i][j])
        }
    }
    return csvContent.join("\r\n")
}

function generateCsvFilename(url){
    let matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i); //Matches the protocol and the domain name of a url
    let domain = matches && matches[1];
    let fileSafeDomain = domain.replaceAll(".", "-")
    let date = new Date()
    return `${date.toDateString().toLowerCase().replaceAll(" ", "-")}-${fileSafeDomain}.csv`
}