function downloadBlob(content, filename, contentType){
    let blob = new Blob([content], {type: contentType})
    let url = URL.createObjectURL(blob)

    let dl = document.createElement('a')
    dl.href = url
    dl.setAttribute('download', filename)
    dl.click()
}