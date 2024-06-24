function truncText(text, charsToReturn){
    if(text.trim().length <= (charsToReturn + 2)){
        return text.trim()
    }
    return text.trim().slice(0, charsToReturn).trim() + "..."
}