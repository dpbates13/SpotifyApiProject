const url = "https://api.spotify.com/v1/search?q=tag%3Anew&type=album&limit=50";
const bearer = "Bearer BQC3VkQtTq0LgXwP_U9nT6wH0ehUDSQgfyr0f-r-hl69cdtnxcLU1pco0oW2unUsFf_Gd11Og_a5hw1VhNXMsGasO6dgJXgJfqA1NvLfM45oSR3OoYa1ta0qmiIKgPZuqdDOW94adNl5Lw";
let idList = [];
let idArray = [];
let albumDatabase = [];
let artistDatabase = {};

function getIds(url) {
    //console.log('getIds GO');
    return new Promise((resolve, reject) => fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    }).then(response => {
        //console.log('getIds 1st response GO');
        
        if (response.status !== 200) {
            if (response.status == 404) {
                resolve(idList);
            }
            else {
                throw `${response.status}: ${response.statusText}`;
            }
            //throw `${response.status}: ${response.statusText}`;
        }
        const r = response.json();
        //console.log(r);
        return r;
    }).then(responseJson => {
        //console.log('getIds 2nd response GO');
        //let idList = [];
        for (let i=0; i<responseJson.albums.items.length; i++) {
            if (responseJson.albums.items[i] == null) {
                let z = 0;
            }
            else {idList.push(responseJson.albums.items[i].id)};
        }
        //console.log(database);
        if (responseJson.albums.next !== null) {
            console.log(responseJson.albums.next);
            resolve(getIds(responseJson.albums.next));
            //resolve();
        } else {
            resolve(idList);
        }
        //resolve(idList);
    }));
}



function createIdArray(idList) {
    return new Promise((resolve, reject) => {
    //console.log('createIdArray GO');
    let count = 0;
    let idString = "";
    for (i = 0; i<idList.length; i++) {
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
    //console.log(idArray);
    resolve(idArray);
})
}
/*
function GetAlbumData(idList, count = 0) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.spotify.com/v1/albums/${idList[count]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(response => {
            const r = response.json();
            console.log(r);
            return r;
        }).then(response => {
            albumDatabase.push(response);
            count++;
            if (count < idList.length) {
                resolve(GetAlbumData(idList, count));
            }
            else {
                resolve(albumDatabase);
            }
        })
    })
}
*/
function createAlbumDatabase(idArray, count = 0) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.spotify.com/v1/albums?ids=${idArray[count]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(response => {
            const r = response.json();
            console.log(r);
            return r;
        }).then(response => {
            albumDatabase.push(response);
            count++;
            if (count < idArray.length) {
                resolve(createAlbumDatabase(idArray, count));
            }
            else {
                resolve(albumDatabase);
            }
        })
    })
    //console.log(idArray[0]);
    /*for (i = 0; i<idArray.length; i++) {
        //let query = idArray[i].replace(/,/g, '%');
        //console.log(query);
        fetch(`https://api.spotify.com/v1/albums?ids=${idArray[i]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
    }).then(response => {
        const r = response.json();
        //console.log(r);
        return r;
    }).then(response => {
        //const r = response;
        console.log(response);
        //albumDatabase.push(response);
        //console.log(albumDatabase);
        for (i=0; i<response.length; i++) {
            console.log(response.albums[i]);
            albumDatabase.push(response.albums[i]);
        }
        //resolve();
    });
}*/
}

function createArtistStrings(data) {
    let strArr = [];
    let artStr = '';
    let count = 0;
    let tot = 0;
    console.log(data[0].albums[0].artists[0].id);
    for (i=0; i<data.length; i++) {
        //console.log('go');
        tot ++;
        console.log(tot);
        for (j=0; j<data[i].albums.length; j++) {
            //console.log('Go');
            //console.log(data[i].albums[j].artists);
            console.log(data[i].albums[j]);
            console.log(`i=${i} and j=${j}`);
            if (data[i].albums[j] === null) {
                let poiuoipu = 0;
            }
            else {
            for (const artist in data[i].albums[j].artists) {
                //console.log('GO!');
                if (count == 49) {
                    artStr += `${data[i].albums[j].artists[artist].id}`;
                    //console.log(artStr);
                    strArr.push(artStr);
                    artStr = '';
                    count = 0;
                }
                else {
                    artStr += `${data[i].albums[j].artists[artist].id},`;
                    //console.log(artStr);
                    count ++;
                    //console.log(count);
                }
            }}
        }
    }
    console.log(strArr);
    return strArr;
}

function getArtists(data, count = 0) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.spotify.com/v1/artists?ids=${data[count]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }).then(response => {
            const r =response.json();
            console.log(r);
            return r;
        }).then(response => {
            for (i=0; i<response.length; i++) {
                
            }
        })
    })
}

async function createInitialDatabase() {
    const start = await getIds(url);
    const idStrings = await createIdArray(start);
    const dataB = await createAlbumDatabase(idStrings);
    console.log(dataB);
    const artistStrings = createArtistStrings(dataB);
    console.log(artistStrings);
    const artistGenres = await getArtists(artistStrings);
    //console.log(artistGenres);

    /*GetAlbumData(start)
    .then(response => {
        console.log(response);
    })*/
    /*
    createIdArray(start)
    .then(response => {
        createAlbumDatabase(response);
    }).then(response => {
        console.log(response);
    })
    */
    //start.then(resp => createIdArray(idList))
    //.then(re => console.log(idArray));
    //console.log(start);
    //getIds(url)
    //.then(resp => createIdArray(idList));
}

$(createInitialDatabase);