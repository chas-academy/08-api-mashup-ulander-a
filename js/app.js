// Init DOM elements
const imgList = document.getElementById("photos")
const wordList = document.getElementById("words")
const searchTerm = document.getElementById("term")

// Init API Keys
const wordsKey = "db37862dc9b2b7334362debc7f5073ef"
const flickrKey = "dfaea809f9a59444f58aa5a4eaf4cd98"

// API Calls
let thesaurus = (query) => {
    return "http://words.bighugelabs.com/api/2/" + wordsKey + "/" + query + "/json"
}

let flickr = (query) => {
    return "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrKey + "&text=" + query + "&per_page=33&format=json&nojsoncallback=1"
}

// DOM-manipulation methods
let appendToList = (list, data) => {
    list.innerHTML += "<li>" + data + "</li>"
    if (list === imgList) {
        list.innerHTML += "<li><img src=" + data + " /></li>"
    }
}

// Turn flickr response to url
let imgUrl = (data) => {
    return "https://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + ".jpg"
}

let handleData = (array) => {
    imgData = array[0].photos.photo
    wordData = array[1].adjective.syn

    imgUrls = []
    imgData.forEach(element => {
        imgUrls.push(imgUrl(element))
    })

    //handle words

    console.log(imgUrls)
    console.log(wordData)
}

// To do:
// trigger when form is sent
// fetch input value as query
function search(query) {

    Promise.all([fetch(flickr(query)), fetch(thesaurus(query))])
        .then(res => {
            return res.map(type => type.json() )
        })
        .then(res => {
            Promise.all(res)
                .then(res => {
                    return handleData(res)
                })
        });

    // Update "searched for:" text
    searchTerm.innerText = query
    // Clear input field(?)
}

search("red")

                    // data.adjective.syn.forEach(word => {
                    //     appendToList(wordList, word)
                    // })

                    // let imgUrls = []
                    // data.photos.photo.forEach(photo => {
                    //     imgUrls.push(imgUrl(photo))
                    // })
                    // imgUrls.forEach(url => {
                    //     appendToList(imgList, url)
                    // })