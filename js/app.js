// Init DOM elements
const gallery = document.getElementById("gallery")
const buttonsList = document.getElementById("buttons")
const searchTerm = document.getElementById("term")
const form = document.querySelector("form")
const input = document.querySelector("input")
let buttons

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

let appendTo = (container, data) => {
    if (container === buttonsList) {
        container.innerHTML += "<button class='word-btn' value='" + data + "'>" + data + "</button>"
    }
    if (container === gallery) {
        container.innerHTML += "<img src=" + data + " />"
    }
}

function clearContent() {
    buttonsList.innerHTML = ""
    gallery.innerHTML = ""
}

let addFunctionality  = (buttons) => {
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            search(this.value)
        })
    });
}

function updatePage(words, imgs) {
    clearContent()
    words.forEach(element => {
        appendTo(buttonsList, element)
    });
    imgs.forEach(element => {
        appendTo(gallery, element)
    });
    buttons = document.querySelectorAll(".word-btn")
    addFunctionality(buttons)
    input.value = ""
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    search(input.value)
})

// Data handling functions
let imgUrl = (data) => {
    return "https://farm" + data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + ".jpg"
}

let handleWords = (data) => {
    let w = []
    data.forEach(element => {
        element.syn.forEach(synonym => {
            w.push(synonym)
        })
    })
    return w
}

let handleData = (array) => {
    imgData = array[0].photos.photo

    imgUrls = []
    imgData.forEach(element => {
        imgUrls.push(imgUrl(element))
    })

    wordData = []
    if (array[1].adjective) {
        wordData.push(array[1].adjective)
    }
    if (array[1].noun) {
        wordData.push(array[1].noun)
    }

    words = handleWords(wordData)

    updatePage(words, imgUrls)
}

function search(query) {
    searchTerm.innerText = query
    Promise.all([fetch(flickr(query)), fetch(thesaurus(query))])
        .then(res => {
            return res.map(type => type.json())
        })
        .then(res => {
            Promise.all(res)
                .then(res => {
                    return handleData(res)
                })
        })
}
