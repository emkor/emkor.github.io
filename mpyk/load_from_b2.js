function bytesToSize(bytes) {
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

$(document).ready(function () {
    let b2ApiHost = "https://f001.backblazeb2.com";

    fetch(b2ApiHost + "/file/mpk-wroclaw/listing.json")
        .then(resp => resp.json())
        .then(jsonResp => jsonResp.files)
        .then(files => {
            let htmlElems = [];
            let dlByIdUrl = "/b2api/v1/b2_download_file_by_id?fileId=";
            for (var file of files) {
                let fileDlUrl = b2ApiHost + dlByIdUrl + file.fileId;
                htmlElems.push("<li><a href='" + fileDlUrl + "'>file.fileName</a> (" + bytesToSize(file.contentLength) + ")</li>")
            }
            $("#download ol").append(htmlElems.join(""));
        })
        .catch(error => console.error("Error:", error));
});