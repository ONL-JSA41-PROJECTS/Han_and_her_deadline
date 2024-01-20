let account = JSON.parse(localStorage.getItem("currentAccount")) || []
let accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
let userAddedProducts = JSON.parse(sessionStorage.getItem("addedProducts")) || []

const productsContainer = document.getElementById("products-container")
const dingSound = document.getElementById("ding")
const cartQuantity = document.getElementById("cart-quantity")
const cart = document.getElementById("cart")
const home = document.getElementById("home")

let reviewingShop = JSON.parse(localStorage.getItem("userReview")) || []
console.log(reviewingShop)
document.title = reviewingShop.shop || "No shop to review"


cartQuantity.innerHTML = account.cart.length

cart.addEventListener("click", function () {
    window.location.href = "../pages/cart.html"
})
home.addEventListener("click", function () {
    window.location.href = "../pages/shop.html"
})

function loadShop(shop) {
    let shopContainer = document.createElement("div")
    shopContainer.id = "shopContainer"
    shopContainer.classList.add("red")


    let shopName = document.createElement("p")
    shopName.innerHTML = shop.shop
    shopContainer.appendChild(shopName)

    let shopImg = document.createElement("img")
    shopImg.src = shop.shopImg
    shopContainer.appendChild(shopImg)

    document.body.appendChild(shopContainer)
}

loadShop(reviewingShop)

// LOAD SHOP'S PRODUCTS

if (reviewingShop.type == "original") {
    for (let i in products) {
        createElementHTML(products[i], i)
    }
}
else {
    for (let account of accountsList) {
        for (let shop of account.shops) {
            for (let j in shop.products) {
                createElementHTML(shop.products[j], j)
            }
        }
    }

}

// CREATE .COL
function createElementHTML(product, i) {
    let item = document.createElement("div")
    item.classList.add("col")
    item.style.backgroundColor = "#e2dfca"

    let name = document.createElement("p")
    name.innerHTML = product.name
    name.onclick = function () { moveToReview(product, i) }
    item.appendChild(name)

    let hr = document.createElement("hr")
    item.appendChild(hr)

    let content = document.createElement("div")
    content.classList.add("infor")

    let quickAddToCartBtn = document.createElement("button")
    quickAddToCartBtn.classList.add("quick-add-to-cart")
    quickAddToCartBtn.onclick = function () { addToCart(product) }
    quickAddToCartBtn.innerHTML = "Add to Cart"


    let pic = document.createElement("img")
    pic.src = product.img
    pic.onclick = function () {
        moveToReview(product, i)
    }

    content.appendChild(pic)

    item.appendChild(quickAddToCartBtn)

    item.appendChild(content)

    productsContainer.appendChild(item)
}
//  AFTER PRESSING ADD TO CART BTN
function addToCart(reviewItem) {
    dingSound.play()
    // get product's current quantity
    let temp = 0

    if (JSON.parse(localStorage.getItem("userAccounts")) && JSON.parse(localStorage.getItem("currentAccount"))) {
        let accountIndex = accountsList.findIndex(elm => elm.name == account.name && elm.pass == account.pass)
        let index = accountsList[accountIndex].cart.findIndex(item => item.name == reviewItem.name)

        if (index != -1) {
            temp = accountsList[accountIndex].cart[index].quantity
        }
    }


    if (JSON.parse(localStorage.getItem("currentAccount"))) {

        // add to cart - before procedure
        accountIndex = accountsList.findIndex(elm => elm.name == account.name && elm.pass == account.pass)
        index = account.cart.findIndex(item => item.name == reviewItem.name)

        temp += 1

        // add chosen item into user cart
        if (index == -1) {
            accountsList[accountIndex].cart.push({
                id: reviewItem.id,
                name: reviewItem.name,
                img: reviewItem.img,
                price: reviewItem.price,
                describe: reviewItem.describe,
                quantity: temp,
                shop: reviewItem.shop,
                shopImg: reviewItem.shopImg,
                more: reviewItem.more
            })

            account.cart.push({
                id: reviewItem.id,
                name: reviewItem.name,
                img: reviewItem.img,
                price: reviewItem.price,
                describe: reviewItem.describe,
                shop: reviewItem.shop,
                shopImg: reviewItem.shopImg,
                quantity: temp,
                more: reviewItem.more
            })
        }
        else {
            accountsList[accountIndex].cart[index].quantity = temp
            account.cart[index].quantity = temp
        }
        localStorage.setItem("userAccounts", JSON.stringify(accountsList))
        localStorage.setItem("currentAccount", JSON.stringify(account))
        alert("Added successfully")        // let user knows if the item is added or not

        if (account.cart.length <= 9) {
            cartQuantity.innerHTML = account.cart.length
        }
        else {
            cartQuantity.innerHTML = "9<sub>+</sub>"
        }
    }
    else {
        window.location.href = "../pages/login.html"
        alert("Please sign in to add this item into your cart")
    }
}

// GO TO REVIEW PAGE
function moveToReview(item, i) {
    console.log(i)
    if (item.type == "original") {
        addToReview(true, i)
    }
    else {
        addToReview(false, i)
    }

    window.location.href = "../pages/review.html"
}

// SET REVIEW STORAGE
function addToReview(original, i) {
    let userReview
    if (original) {
        userReview = {
            type: "original",
            id: products[i].id,
            productIndex: i,
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
        userReview = {
            type: "added",
            id: userAddedProducts[i].id,
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