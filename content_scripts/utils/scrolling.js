function getScrollDirection(currentScrollHeight){
    let lastScrollHeight = currentScrollHeight
    currentScrollHeight = window.scrollY

    if(lastScrollHeight < currentScrollHeight){
        return "down"
    } else if(lastScrollHeight > currentScrollHeight){
        return "up"
    } else{
        return "noscroll"
    }
}

function getHeightScrolled(currentScrollHeight){
    let lastScrollHeight = currentScrollHeight
    currentScrollHeight = window.scrollY

    return Math.abs(lastScrollHeight - currentScrollHeight)
}