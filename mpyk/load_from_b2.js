$(document).ready(function () {
    let b2Token = "";
    let b2DownloadUrl = "";
    let b2ListingFileUrl = "https://f001.backblazeb2.com/file/mpk-wroclaw/listing.json";
    let b2AuthUrl = "https://api.backblazeb2.com/b2api/v5/b2_authorize_account";
    let b2Bucket = "mpk-wroclaw";
    let b2IdKey = "001a56c121eaece0000000004:K001N+B5pe3hbaSZQSddFVP9WztLoEI";
    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(b2IdKey));

    fetch(b2ListingFileUrl)
        .then(resp => resp.json())
        .then(jsonResp => {
            console.log("Success:", jsonResp);
            console.log("Success:", JSON.stringify(jsonResp));
        })
        .catch(error => console.error("Error:", error));

});