let keyDownId = localStorage.getItem("keyDownId") ? parseInt(localStorage.getItem("keyDownId")) + 1 : 1

let keysPressed = []

document.addEventListener('keydown', function (e) {
    if (e.repeat) { return }
    if (!keysPressed.includes(e.code)) {
        let url = window.location.href
        let title = document.title
        let page = new Page(url, title)

        let key = new KeyAction()
        key.page = page
        key.action = "keydown"
        key.id = keyDownId
        key.actionTime = Date.now()

        keysPressed.push({
            keyCode: e.code,
            keydown: key,
        })

        console.log(keysPressed)

        localStorage.setItem("keyDownId", keyDownId)
        keyDownId++

        numberOfActions = actions.unshift(key)

        localStorage.setItem("actions", JSON.stringify(actions))
        localStorage.setItem("numberOfActions", numberOfActions)
    }
})

document.addEventListener('keyup', function (e) {
    console.log(keysPressed)
    let index = keysPressed.map(obj => obj.keyCode).indexOf(e.code)
    console.log(index)

    let url = window.location.href
    let title = document.title
    let page = new Page(url, title)

    let key = new KeyAction()
    key.page = page
    key.action = "keyup"
    key.id = keysPressed[index].keydown.id
    key.actionTime = Date.now()

    keysPressed.splice(index, 1)

    numberOfActions = actions.unshift(key)

    localStorage.setItem("actions", JSON.stringify(actions))
    localStorage.setItem("numberOfActions", numberOfActions)
    return
})