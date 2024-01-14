userAddedProducts = JSON.parse(sessionStorage.getItem("addedProducts")) || []

const sound = document.getElementById("sound")
const topper = document.getElementById("topper")
const search = document.getElementById("search")
const searchInput = document.getElementById("searchInput")
const home = document.getElementById("home")
const cart = document.getElementById("cart")

// nav
home.addEventListener("click", function () {
    window.location.href = "../index.html"
})
cart.addEventListener("click", function () {
    window.location.href = "./cart.html"
})
cartQuantity.addEventListener("click",function(){
    window.location.href = "./cart.html"
})

// other features
let inReview = false

document.addEventListener("click", async function (e) {
    e.preventDefault()
    await sound.play()
})
// review product
function moveToReview(item,i){
    if (item.type == "original") {
        addToReview(true, i)
    }
    else {
        addToReview(false, i)
    }

    window.location.href = "../pages/review.html"
}
// add to cart 
function addToReview(original,i) {
    let userReview
    if (original) {
        userReview ={
            productIndex:i,
            name: products[i].name,
            img: products[i].img,
            price: products[i].price,
            describe: products[i].describe,
            more: products[i].more,
            shopImg: products[i].shopImg,
            shop: products[i].shop
        }
    }
    else {
        userReview ={
            productIndex: i,
            name: userAddedProducts[i].name,
            img: userAddedProducts[i].img,
            price: userAddedProducts[i].price,
            describe: userAddedProducts[i].describe,
            more: userAddedProducts[i].more,
            shopImg: userAddedProducts[i].shopImg,
            shop: userAddedProducts[i].shop
        }
    }

    localStorage.setItem("userReview", JSON.stringify(userReview))
}

// search products
search.addEventListener("click", function () {
    searchItem()
})
searchInput.addEventListener("keydown", function (e) {
    searchItem()
})

// remove unicode, uppercase..
function normalize(str) {
    return str
        .toLowerCase()
        .replace(/[^\x00-\x7F]/g, "");
}
function searchItem() {
    let items = document.querySelectorAll(".col")

    if (searchInput.value.trim() != 0) {

        for (let item of items) {
            if (normalize(item.querySelector("p").innerHTML).includes(normalize(searchInput.value))) {
                try {
                    item.classList.remove("hidden")
                }
                catch { }
            }
            else {
                item.classList.add("hidden")
            }
        }
    }
    else {
        for (let item of items) {
            try {
                item.classList.remove("hidden")
            }
            catch { }
        }
    }
}