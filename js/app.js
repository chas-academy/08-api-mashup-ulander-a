// Init DOM elements
const imgList = document.getElementById("photos")
const wordList = document.getElementById("words")

// Init API Keys
const wordsKey = "db37862dc9b2b7334362debc7f5073ef"
const flickrKey = "dfaea809f9a59444f58aa5a4eaf4cd98"

// API Calls
let thesaurus = (word) => {
    return "http://words.bighugelabs.com/api/2/" + wordsKey + "/" + word + "/json"
}

let flickr = (query) => {
    let val = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=` + flickrKey + `&text=` + query + `&per_page=33&format=json&nojsoncallback=1`

    return val
}

// Methods
function appendToList(list, data) {
    list.innerHTML += ("<li>" + data + "</li>")
}

// Flickr fetch example
fetch(flickr("red"))
    .then(response => {
        response.json()
            .then(data => {
                console.log(data)
            })
    })

// Thesaurus fetch example
fetch(thesaurus("red"))
    .then(response => {
        response.json()
            .then(data => {
                let synoNouns = data.noun.syn
                let synoAdjs = data.adjective.syn
                synoNouns.forEach(element => {
                    appendToList(wordList, element)
                })

                synoAdjs.forEach(element => {
                    appendToList(wordList, element)
                })
            })
    })
    .catch(error => console.error(error))

// trigger when form is sent
// fetch input value as query
function search(query) {
    flickr(query) // fetch results from api's 
    thesaurus(query) // fetch results from api's

    // put results into array

    // populate app with images and new search options from array(s)
}