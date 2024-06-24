function createClick(mouseup, mousedown) {
    let click = new MouseClick();
    click.page = mousedown.page
    click.action = "click"
    click.id = mousedown.id
    click.mouseDownTarget = mousedown.target
    click.mouseUpTarget = mouseup.target
    click.beginMouseCoord.x = mousedown.mouseCoord.x
    click.beginMouseCoord.y = mousedown.mouseCoord.y
    click.endMouseCoord.x = mouseup.mouseCoord.x
    click.endMouseCoord.y = mouseup.mouseCoord.y
    click.actionTime = mouseup.actionTime
    click.clickTime = mouseup.actionTime - mousedown.actionTime

    return click
}

function replaceMouseDownUpWithClick(actions, mouseDownUpIndexes){
    let actionsClone = actions.slice()
    
    for (let i = 0; i < mouseDownUpIndexes.length; i++) {
        let mouseUpDown = actionsClone.slice(mouseDownUpIndexes[i] - i, mouseDownUpIndexes[i + 1])
        let mouseUp = mouseUpDown[0]
        let mouseDown = mouseUpDown[1]
        let click = createClick(mouseUp, mouseDown)
        
        actionsClone.splice(mouseDownUpIndexes[i] - i, 2, click)
    }
    return actionsClone
}

function getMouseUpDownPairIndexes(actions) {
    let neighborMouseUpDown = actions
        .map((element, i, arr) => {
            if (element.action == "mouseup" && i < arr.length) {
                if (arr[i + 1]?.action == "mousedown" && arr[i + 1]?.id == element.id) {
                    return i
                }
            }
        })
        .filter((element) => element != undefined)
    
    return neighborMouseUpDown
}