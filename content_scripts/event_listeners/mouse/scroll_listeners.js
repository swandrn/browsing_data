let scrollId = localStorage.getItem("scrollId") ? parseInt(localStorage.getItem("scrollId")) + 1 : 1

let currentScrollHeight = window.scrollY

window.addEventListener("scrollend", function (e) {
    let url = window.location.href
    let title = document.title
    let page = new Page(url, title)

    let scroll = new ScrollAction()
    scroll.page = page
    scroll.action = "scroll"
    scroll.id = scrollId
    scroll.direction = getScrollDirection(currentScrollHeight)
    scroll.heightScrolled = getHeightScrolled(currentScrollHeight)
    scroll.currentHeight = window.scrollY
    scroll.actionTime = Date.now()
    
    currentScrollHeight = window.scrollY

    localStorage.setItem("scrollId", scrollId)
    scrollId++

    numberOfActions = actions.unshift(scroll)

    localStorage.setItem("actions", JSON.stringify(actions))
    localStorage.setItem("numberOfActions", numberOfActions)
})