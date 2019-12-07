const url = "https://api.spotify.com/v1/search?q=tag%3Anew&type=album&limit=50";
const bearer = "Bearer BQB_okUu2kNmALlF_khaYVMy4Meog4IecpW755oEXk88CvYFYie0nfYh4OlYUWvP0-6XuCcGduH3Mf9y_Im0XUdJPm0Y3Ff21B-LwHDnqpNtvo3hShjKXLNq1K5bxq7iQmyJTTflbGArZw";
let idList = [];
let idArray = [];

function getIds(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    }).then(response => {
        return response.json();
        //console.log(response.json());
    }).then(responseJson => {
        //let idList = [];
        for (let i=0; i<responseJson.albums.items.length; i++) {
            idList.push(responseJson.albums.items[i].id);
        }
        //console.log(database);
        if (responseJson.albums.next !== null) {
            doIt(responseJson.albums.next);
        }
        //return idList;
    }).then(response => {
        createIdArray(idList);
        console.log(idList);
    });
}

function doIt(next) {
    fetch(next, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    }).then(response => {
        return response.json();
        //console.log(response.json());
    }).then(responseJson => {
        //let idList = [];
        for (let i=0; i<responseJson.albums.items.length; i++) {
            idList.push(responseJson.albums.items[i].id);
        }
        //console.log(database);
        if (responseJson.albums.next !== null) {
            doIt(responseJson.albums.next);
        }
    })
}

function createIdArray(idList) {
    let count = 0;
    let idString = "";
    for (i = 0; i<10000; i++) {
        if (count == 19) {
            idString += `${idList[i]}`;
            idArray.push(idString);
            count = 0;
            idString = "";
        }
        else {
            idString += `${idList[i]},`;
            count ++;
        }
    }
    console.log(idArray);

}

function createAlbumDatabase(idArray) {
    console.log(idArray);
}

function createInitialDatabase() {
    getIds(url);
}

$(createInitialDatabase);