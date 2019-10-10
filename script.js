const idList = [];
const bearer = "Bearer BQAz_Uducobg1M1k8T34WDa1sXFHC_9uQQbCLshRZa1yXa0b80ltQiuVw0vi_nn-v-v5qnWUc-KeSBf8s7tRZw3xmIe_5jXEysTY7b9TCHnDIzYMkCmlIrGl43CWOyZPdMv_qOR5lAFIjGN9";

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
        for (let i=0; i<responseJson.albums.items.length; i++) {
            idList.push(responseJson.albums.items[i].id);
        }
        //console.log(database);
        if (responseJson.albums.next !== null) {
            getIds(responseJson.albums.next);
        }
    })
}

function createIdArray(idList) {
    let idArray = [];
    let count = 0;
    let idString = "";
    for (i = 0; i<idList.length; i++) {
        if (count == 19) {
            idString += `${idList[i]}`;
            idArray.push(idString);
            count = 0;
        }
        else {
            idString += `${idList[i]},`;
            count ++;
        }
    }
    console.log(idArray);

}

function initialDatabaseConstruction() {
    $('form').submit(event => {
        event.preventDefault();
        console.log('working');
        getIds("https://api.spotify.com/v1/search?q=tag%3Anew&type=album&limit=50");
        console.log(idList);
        createIdArray(idList);
    })
}

$(initialDatabaseConstruction);