// Init variables for testing
const ul = document.getElementById('photos')
const flickr = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent"

fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=dfaea809f9a59444f58aa5a4eaf4cd98&per_page=10&format=json&nojsoncallback=1")
.then(response => {
    response.json()
        .then(data => {
            let photos = data.photos.photo

            imgUrls = []
            photos.forEach(element => {
                img = "https://farm" + element.farm + ".staticflickr.com/" + element.server + "/" + element.id + "_" + element.secret + "_n.jpg"
                imgUrls.push(img)
            })

            console.log(imgUrls)

            imgUrls.forEach(element => {
                ul.innerHTML += ("<li>" + "<img src='"+element+"'</li>")
            })
        })
})
.catch(error => {
    console.log("Something went teribly wrong! : ".error)
})





