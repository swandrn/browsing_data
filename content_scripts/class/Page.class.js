class Page{
    url
    title
    time

    constructor(url, title){
        this.url = url
        this.title = title
        this.time = new Date.now()
    }
}