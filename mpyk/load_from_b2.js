$(document).ready(function () {
    let b2Token = "";
    let b2DownloadUrl = "";
    let b2AuthUrl = "https://api.backblazeb2.com/b2api/v5/b2_authorize_account";
    let b2Bucket = "mpk-wroclaw";
    let b2IdKey = "001a56c121eaece0000000004:K001N+B5pe3hbaSZQSddFVP9WztLoEI";
    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(b2IdKey));

    fetch(b2AuthUrl, {method: "GET", headers: headers})
        .then(resp => resp.json())
        .then(jsonResp => {
            console.log("Success:", JSON.stringify(jsonResp));
            b2Token = jsonResp.authorizationToken;
            b2DownloadUrl = jsonResp.downloadUrl;
        })
        .catch(error => console.error("Error:", error));

});