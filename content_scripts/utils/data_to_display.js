function getUniqueUrls(actions) {
    const allUrls = new Array()
    for (let i = 0; i < actions.length; i++) {
        let page = actions[i].page
        allUrls.unshift(page.url)
    }
    const uniqueUrls = [... new Set(allUrls)]
    return uniqueUrls
}

function getAllActionsOfUrl(domainActions, domainUrl) {
    const actions = new Array()
    for (let i = 0; i < domainActions.length; i++) {
        let url = domainActions[i].page.url
        if (url == domainUrl) [
            actions.unshift(domainActions[i])
        ]
    }
    return actions
}

function getBrowserSettings(){
    return {
        userAgent: `${window.navigator.userAgent}`,
        browserSize: `${window.outerWidth} x ${window.outerHeight}`
    }
}