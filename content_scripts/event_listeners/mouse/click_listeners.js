let mouseDownId = localStorage.getItem("mouseDownId") ? parseInt(localStorage.getItem("mouseDownId")) + 1 : 1
let mouseUpId = localStorage.getItem("mouseUpId") ? parseInt(localStorage.getItem("mouseUpId")) + 1 : 1

document.addEventListener('mousedown', function (e) {
    let url = window.location.href
    let title = document.title
    let page = new Page(url, title)

    let click = new ClickAction()
    click.page = page
    click.id = mouseDownId
    click.action = "mousedown"
    click.target = truncText(e.target.textContent, 33)
    click.mouseCoord.x = e.clientX
    click.mouseCoord.y = e.clientY
    click.actionTime = Date.now()
    
    localStorage.setItem("mouseDownId", mouseDownId)
    mouseDownId++

    numberOfActions = actions.unshift(click)

    localStorage.setItem("actions", JSON.stringify(actions))
    localStorage.setItem("numberOfActions", numberOfActions)
})

document.addEventListener('mouseup', function (e) {
    let url = window.location.href
    let title = document.title
    let page = new Page(url, title)

    let click = new ClickAction()
    click.page = page
    click.id = mouseUpId
    click.action = "mouseup"
    click.target = truncText(e.target.textContent, 33)
    click.mouseCoord.x = e.clientX
    click.mouseCoord.y = e.clientY
    click.actionTime = Date.now()
    
    localStorage.setItem("mouseUpId", mouseUpId)
    mouseUpId++

    numberOfActions = actions.unshift(click)

    localStorage.setItem("actions", JSON.stringify(actions))
    localStorage.setItem("numberOfActions", numberOfActions)
})