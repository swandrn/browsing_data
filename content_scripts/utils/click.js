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

function createDblClick(clickOne, clickTwo) {
    let dblclick = new DoubleClick();
    dblclick.page = clickTwo.page
    dblclick.action = "dblclick"
    dblclick.firstId = clickOne.id
    dblclick.secondId = clickTwo.id
    dblclick.firstClickTarget = clickOne.mouseUpTarget
    dblclick.secondClickTarget = clickTwo.mouseUpTarget
    dblclick.firstMouseCoord.x = clickOne.endMouseCoord.x
    dblclick.firstMouseCoord.y = clickOne.endMouseCoord.y
    dblclick.secondMouseCoord.x = clickTwo.endMouseCoord.x
    dblclick.secondMouseCoord.y = clickTwo.endMouseCoord.y
    dblclick.actionTime = clickTwo.actionTime
    dblclick.dblclickTime = clickOne.clickTime + clickTwo.clickTime

    return dblclick
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

function replaceClicksWithDblClick(actions){
    let actionsClone = actions.slice()
    
    for (let i = 0; i < actionsClone.length; i++) {
        if(actionsClone[i].action === "click"){
            if(actionsClone[i + 1]?.action === "click" && (actionsClone[i]?.actionTime - actionsClone[i + 1].actionTime) < 500){
                let dblclick = createDblClick(actionsClone[i + 1], actionsClone[i])
                actionsClone.splice(i, 2, dblclick)
            }
        }
    }
    return actionsClone
}