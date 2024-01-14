let userAddedProducts = JSON.parse(sessionStorage.getItem("addedProducts")) || []
const accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
const account = JSON.parse(localStorage.getItem("currentAccount")) || {}

const cartQuantity = document.getElementById("cart-quantity")
const nav = document.getElementById("nav")
const choices = nav.querySelectorAll("li")
const priceArrangeSelect = document.getElementById("price-arrange")
let chosen = nav.querySelector(".chosen")

priceArrangeSelect.value = "default"

if (account.cart.length <= 9) {
        cartQuantity.innerHTML = account.cart.length
}
else {
        cartQuantity.innerHTML = "9<sub>+</sub>"
}

loadChoice()


priceArrangeSelect.addEventListener("change", function () {
        loadChoice()
})

for (let choice of choices) {
        choice.addEventListener("click", function () {
                chosen = nav.querySelector(".chosen")
                chosen.classList.remove("chosen")
                choice.classList.add("chosen")

                chosen = choice

                list.replaceChildren()

                loadChoice()
        })
}
// install products

function loadChoice() {
        list.replaceChildren()

        if (chosen.innerHTML == "All") {
                loadOriginal()
                loadAdded()
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "There isn't any free product!"
                        list.appendChild(p)
                }
        }
        else if (chosen.innerHTML == "Original") {
                loadOriginal()
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "There isn't any free product!"
                        list.appendChild(p)
                }
        }
        else if (chosen.innerHTML == "Added") {
                loadAdded()
        }
        else if (chosen.innerHTML == "Newest") {
                loadNewest()
        }
        else if (chosen.innerHTML == "Common") {
                loadCommon()
        }
}

function loadOriginal() {
        if (priceArrangeSelect.value == "default") {
                for (let i in products) {
                        createProductHTML(products[i], i)
                }
        }
        else if (priceArrangeSelect.value == "low-to-high") {
                let sorted = products.map(x => x.price).sort().reverse()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in products) {
                                if (products[i].price == price) {
                                        if (isAdded.indexOf(products[i].name) == -1) {
                                                createProductHTML(products[i], i)
                                                isAdded.push(products[i].name)
                                        }
                                }
                        }
                }
        }
        else if (priceArrangeSelect.value == "high-to-low") {
                let sorted = products.map(x => x.price).sort()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in products) {
                                if (products[i].price == price) {
                                        if (isAdded.indexOf(products[i].name) == -1) {
                                                createProductHTML(products[i], i)
                                                isAdded.push(products[i].name)
                                        }
                                }
                        }
                }
        }
        else if (priceArrangeSelect.value == "free") {
                for (let i in products) {
                        if (products[i].price == 0) {
                                createProductHTML(products[i], i)
                        }
                }
        }
}

function loadAdded() {
        if (priceArrangeSelect.value == "default") {
                for (let i in userAddedProducts) {
                        createProductHTML(userAddedProducts[i], i)
                }
        }
        else if (priceArrangeSelect.value == "low-to-high") {
                let sorted = userAddedProducts.map(x => x.price).sort().reverse()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in userAddedProducts) {
                                if (userAddedProducts[i].price == price) {
                                        if (isAdded.indexOf(userAddedProducts[i].name) == -1) {
                                                createProductHTML(userAddedProducts[i], i)
                                                isAdded.push(userAddedProducts[i].name)
                                        }
                                }
                        }
                }
        }
        else if (priceArrangeSelect.value == "high-to-low") {
                let sorted = userAddedProducts.map(x => x.price).sort()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in userAddedProducts) {
                                if (userAddedProducts[i].price == price) {
                                        if (isAdded.indexOf(userAddedProducts[i].name) == -1) {
                                                createProductHTML(userAddedProducts[i], i)
                                                isAdded.push(userAddedProducts[i].name)
                                        }
                                }
                        }
                }
        }
        else if (priceArrangeSelect.value == "free") {
                for (let i in userAddedProducts) {
                        if (userAddedProducts[i].price == 0) {
                                createProductHTML(userAddedProducts[i], i)
                        }
                }
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "There isn't any free product!"
                        list.appendChild(p)
                }
        }
        // NO ADDED PRODUCT MESSAGE 
        if (!list.querySelector(".col")) {
                let p = document.createElement("p")
                p.innerHTML = "There isn't any added product."
                list.appendChild(p)
        }

}

function loadNewest() {
        let today = new Date()

        if (priceArrangeSelect.value == "default") {
                for (let product of products) {
                        if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                createProductHTML(product)
                        }
                }
                for (let product of userAddedProducts) {
                        if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                createProductHTML(product)
                        }
                }

                // NO NEWEST FREE PRODUCT MESSAGE
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "There isn't any newest product."
                        list.appendChild(p)
                }
        }
        else if (priceArrangeSelect.value == "free") {

                for (let product of products) {
                        if (product.price == 0) {
                                if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                        createProductHTML(product)
                                }
                        }
                }
                for (let product of userAddedProducts) {
                        if (product.price == 0) {
                                if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                        createProductHTML(product)
                                }
                        }
                }

                // NO NEWEST FREE PRODUCT MESSAGE
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "There isn't any newest free product."
                        list.appendChild(p)
                }
        }
        else if (priceArrangeSelect.value == "high-to-low") {
                let sorted = products.map(x => x.price).sort()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in products) {
                                if (products[i].price == price) {
                                        if (isAdded.indexOf(products[i].name) == -1) {
                                                if (Date.parse(products[i].publish_date) >= Date.parse(today) - 14 * 86400000) {
                                                        createProductHTML(products[i])
                                                        isAdded.push(products[i].name)
                                                }
                                        }
                                }
                        }
                }

                sorted = userAddedProducts.map(x => x.price).sort()
                isAdded = []

                for (let price of sorted) {
                        for (let i in userAddedProducts) {
                                if (userAddedProducts[i].price == price) {
                                        if (isAdded.indexOf(userAddedProducts[i].name) == -1) {
                                                if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                                        createProductHTML(product)
                                                        isAdded.push(userAddedProducts[i].name)
                                                }
                                        }
                                }
                        }
                }

                // NO NEWEST PRODUCT MESSAGE
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "We're very sorry! We haven't updated this category yet."
                        list.appendChild(p)
                }
        }
        else if (priceArrangeSelect.value == "low-to-high") {
                let sorted = products.map(x => x.price).sort().reverse()
                let isAdded = []

                for (let price of sorted) {
                        for (let i in products) {
                                if (products[i].price == price) {
                                        if (isAdded.indexOf(products[i].name) == -1) {
                                                if (Date.parse(products[i].publish_date) >= Date.parse(today) - 14 * 86400000) {
                                                        createProductHTML(products[i])
                                                        isAdded.push(products[i].name)
                                                }
                                        }
                                }
                        }
                }

                sorted = userAddedProducts.map(x => x.price).sort().reverse()
                isAdded = []

                for (let price of sorted) {
                        for (let i in userAddedProducts) {
                                if (userAddedProducts[i].price == price) {
                                        if (isAdded.indexOf(userAddedProducts[i].name) == -1) {
                                                if (Date.parse(product.publish_date) >= Date.parse(today) - 14 * 86400000) {
                                                        createProductHTML(product)
                                                        isAdded.push(userAddedProducts[i].name)
                                                }
                                        }
                                }
                        }
                }

                // NO NEWEST PRODUCT MESSAGE
                if (!list.querySelector(".col")) {
                        let p = document.createElement("p")
                        p.innerHTML = "We're very sorry! We haven't updated this category yet."
                        list.appendChild(p)
                }
        }
}

function loadCommon() {
        try {
                console.log(iei) //NEED UPDATE
        }
        catch {  // CANT LOAD COMMON PRODUCTS MESSAGE
                let p = document.createElement("p")
                p.innerHTML = "We're very sorry! We haven't updated this category yet."
                list.appendChild(p)
        }
}


function createProductHTML(product, i) {
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
        pic.onclick = function () { moveToReview(product, i) }
        content.appendChild(pic)

        let describe = document.createElement("span")

        if (product.describe.length <= 80) {
                describe.innerHTML = " - " + product.describe
        }
        else {
                describe.innerHTML = " - " + product.describe.slice(0, 77) + "..."
        }

        describe.appendChild(quickAddToCartBtn)
        content.appendChild(describe)

        item.appendChild(content)

        list.appendChild(item)
}

function addToCart(reviewItem) {
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
                        console.log(reviewItem.shop)
                        accountsList[accountIndex].cart.push({
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