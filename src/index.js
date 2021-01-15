window.addEventListener('DOMContentLoaded', (e) => {
    let allBreeds = []

    function addImages(array) {
        array.forEach(function (url) {
            let i = document.createElement('img')
            i.src = url
            // i.style.width = "350px"
            document.querySelector("#dog-image-container").appendChild(i)
        })
    }

    function dogList(array) {
        document.querySelector("ul").innerHTML = ""
        array.forEach(function (breed) {
            let item = document.createElement("li")
            item.innerText = breed
            document.querySelector("#dog-breeds").appendChild(item)
            item.addEventListener('click', function(e) {
                e.target.style.color = '#34ebcf'
            })
        })
    }

    function selectBreeds(letter) {
        if (letter === "all"){
            dogList(allBreeds)
        } else {
            let selectedBreeds = allBreeds.filter(breed => breed[0] === letter)
            dogList(selectedBreeds)
        }
    }

    function getDogPics() {
        fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(function (json) {
           addImages(json["message"])
        })
    }
    function getDogBreeds() {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(function (json) {
            dogList(Object.keys(json["message"]))
            Object.keys(json["message"]).forEach(breed => allBreeds.push(breed))
        })
    }

    document.querySelector("select").addEventListener('change', function (e) {
        selectBreeds(e.target.value)
    })

    getDogPics()
    getDogBreeds()
})