// Init DOM elements
const ul = document.getElementById('photos')

// Init API Keys
const wordsKey = "db37862dc9b2b7334362debc7f5073ef"
const flickrKey = "dfaea809f9a59444f58aa5a4eaf4cd98"

// API call functions
let thesaurus = (word) => {
    return "http://words.bighugelabs.com/api/2/"+wordsKey+"/"+word+"/json"
}

// let flickr = ()

// Flickr fetch example
// fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=dfaea809f9a59444f58aa5a4eaf4cd98&per_page=10&format=json&nojsoncallback=1")
// .then(response => {
//     response.json()
//         .then(data => {
//             let photos = data.photos.photo

//             imgUrls = []
//             photos.forEach(element => {
//                 img = "https://farm" + element.farm + ".staticflickr.com/" + element.server + "/" + element.id + "_" + element.secret + "_n.jpg"
//                 imgUrls.push(img)
//             })

//             console.log(imgUrls)

//             imgUrls.forEach(element => {
//                 ul.innerHTML += ("<li>" + "<img src='"+element+"'</li>")
//             })
//         })
// })
// .catch(error => console.error(error))


// Thesaurus fetch example
fetch (thesaurus("red"))
.then(response => {
    response.json()
        .then(data => {
            console.log("Nouns:")
            console.log(data.noun.syn)
            console.log("Adjectives:")
            console.log(data.adjective.syn)
        })
})
.catch(error => console.error(error))