function bytesToSize(bytes) {
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function timestampToUtcString(timeStamp) {
    var newDate = new Date();
    newDate.setTime(timeStamp);
    return newDate.toISOString();
}

$(document).ready(function () {
    let b2ApiHost = "https://f001.backblazeb2.com";
    fetch(b2ApiHost + "/file/mpk-wroclaw/listing.json")
        .then(resp => resp.json())
        .then(jsonResp => jsonResp.files)
        .then(files => {
            let htmlElems = [];
            let dlByIdUrl = "/b2api/v1/b2_download_file_by_id?fileId=";
            let sortedFiles = files.sort((a, b) => b.uploadTimestamp - a.uploadTimestamp);
            for (var file of sortedFiles) {
                if (file.fileName !== "listing.json") {
                    let fileDlUrl = b2ApiHost + dlByIdUrl + file.fileId;
                    htmlElems.push("<tr>" +
                        "<td><a href='" + fileDlUrl + "'>" + file.fileName + "</a></td>" +
                        "<td>" + timestampToUtcString(file.uploadTimestamp) + "</td>" +
                        "<td>" + bytesToSize(file.contentLength) + "</td>" +
                        "</tr>")
                }
            }
            $("#download table tbody").append(htmlElems.join(""));
            $("#download #loadInProgressInfo").addClass("hidden");
            $("#download table").removeClass("hidden");
        })
        .catch(error => {
            $("#download #loadInProgressInfo").addClass("hidden");
            $("#download #loadFailedInfo").removeClass("hidden");
            console.error("Error:", error)
        });
});