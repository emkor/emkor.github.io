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

function parseCsvRowIntoObj(csvRow) {
    let cells = csvRow.split(";");
    return {fileName: cells[0], fileId: cells[1], contentLength: cells[2], uploadTimestamp: cells[3]}
}

$(document).ready(function () {
    let b2ApiHost = "https://f001.backblazeb2.com";
    fetch(b2ApiHost + "/file/mpk-wroclaw/listing.csv")
        .then(resp => {
            if (resp.status === 200) {
                return resp.text()
            } else {
                return Promise.reject(new Error(resp.statusText))
            }
        })
        .then(content => {
            console.log(content);
            let htmlElems = [];
            let dlByIdUrl = "/b2api/v1/b2_download_file_by_id?fileId=";
            let files = [];
            for (let csvLine of content.split("\n")) {
                if (csvLine.length > 0) {
                    files.push(parseCsvRowIntoObj(csvLine));
                }
            }
            let sortedFiles = files.sort((a, b) => {
                if (a.fileName < b.fileName) {
                    return -1
                }
                if (a.fileName > b.fileName) {
                    return 1
                }
                return b.uploadTimestamp - a.uploadTimestamp;
            });
            for (var file of sortedFiles) {
                if (file.fileName !== "listing.json" && file.fileName !== "listing.csv") {
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