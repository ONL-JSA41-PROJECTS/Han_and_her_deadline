const avt = document.getElementById("avt").querySelector("img")
const avtInput = document.getElementById("edit-avt")
const textInfo = document.getElementById("text-info")
let account = JSON.parse(localStorage.getItem("currentAccount")) || []
let accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
const changeInfoTab = document.getElementById("change-info-tab")
const mainInput = document.getElementById("text-input")
const notification = document.getElementById("custom-alert")

let index = accountsList.findIndex(acc => acc.name == account.name && acc.pass == account.pass)
let liList = document.getElementById("tab").querySelectorAll("li")
avt.src = account.avt || "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"

function getBase64(file, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(file)
}
// REMOVE WASTES
// console.log(account)
// account.shops = []
// account.shops[0].products = []
// accountsList[index].shops = []
// accountsList[index].shops[0].products = []
// localStorage.setItem("currentAccount",JSON.stringify(account))
// localStorage.setItem("userAccounts",JSON.stringify(accountsList))

// DEFAULT
personalInfoLoad(document.getElementById("tab").querySelector("li"))



// CHANGE USER AVATAR
avtInput.addEventListener("change", function () {
    getBase64(avtInput.files[0], function (imgURL) {
        avt.src = imgURL

        account["avt"] = imgURL
        accountsList[index]["avt"] = imgURL

        localStorage.setItem("currentAccount", JSON.stringify(account))
        localStorage.setItem("userAccounts", JSON.stringify(accountsList))
    })
})

const sleep = ms => new Promise(r => setTimeout(r, ms));
// ALERT
async function notice(content, reload) {
    notification.style.display = "flex"
    notification.innerHTML = content
    if (reload) {
        notification.innerHTML += "<br>(Wait for updating)"
    }

    await sleep(1500)

    if (reload) {
        location.reload()
    }
}
// LOAD PAGES
function personalInfoLoad(li) {

    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    let container = document.createElement("div")
    container.classList.add("personal-info-container", "darkgrey")

    let username = document.createElement("p")
    if (account != []) {
        // USERNAME
        let changeNameBtn = document.createElement("span")
        changeNameBtn.innerHTML = "edit"
        changeNameBtn.onclick = function () { changeName() }
        changeNameBtn.classList.add("material-symbols-outlined")

        username.innerHTML = "<b>Username: </b> &ensp;" + account.name + "&ensp;"
        username.appendChild(changeNameBtn)

        container.appendChild(username)

        // PASSWORD
        let visiblePassBtn = document.createElement("span")
        visiblePassBtn.classList.add("material-symbols-outlined")
        visiblePassBtn.innerHTML = "visibility_off"

        let pass = document.createElement("p")
        pass.innerHTML = "<b>Password: </b> &ensp;" + "*".repeat(account.pass.length) + "&ensp;"

        let changePassBtn = document.createElement("p")
        changePassBtn.innerHTML = "Change password?"
        changePassBtn.classList.add("change-pass-btn")
        changePassBtn.onclick = async function () {
            changePass()
        }

        visiblePassBtn.onclick = function () {
            checkUser(visiblePassBtn, pass)
        }

        pass.appendChild(visiblePassBtn)

        container.appendChild(pass)
        container.appendChild(changePassBtn)
    }
    else {
        username.innerHTML = "No account yet."
        let loginPageLink = document.createElement("a")
        loginPageLink.classList.add("login-page-link-btn")
        loginPageLink.href = "..pages/login.html"

        container.appendChild(username)
        container.appendChild(loginPageLink)
    }


    textInfo.appendChild(container)
}


// LOAD USER SHOPS
function userShopsLoad(li) {
    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    let createShopBtn = document.createElement("span")
    createShopBtn.classList.add("align-center")
    createShopBtn.style.cssText = "cursor:pointer; position:absolute; top: 30px; left:30px; font-weight:bold;"
    createShopBtn.innerHTML = "<span class='material-symbols-outlined'>new_window</span>" + "Create a shop"
    createShopBtn.onclick = function () { createShop() }

    textInfo.appendChild(createShopBtn)
    let shopsContainer = document.createElement("div")
    shopsContainer.id = "shops-list"

    if (account.shops && account.shops[0]) {
        for (let shop of account.shops) {
            let container = document.createElement("div")
            container.classList.add("shop-container", "darkgrey")
            // add into shop review page
            container.onclick = function () { loadShopInside(shop) }

            let shopName = document.createElement("p")
            shopName.innerHTML = shop.name
            container.appendChild(shopName)

            let shopCover = document.createElement("img")
            shopCover.src = shop.cover
            container.appendChild(shopCover)

            shopsContainer.appendChild(container)
            textInfo.appendChild(shopsContainer)
        }
    }
    else {
        let p = document.createElement("p")
        p.innerHTML = "No shop yet."

        textInfo.appendChild(p)
    }
}


function changeAccountLoad(li) {
    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    for (let acc of accountsList) {
        let container = document.createElement("div")
        container.classList.add("account-display-load")

        if (acc.name == account.name && acc.pass == account.pass) {
            container.classList.add("darkgrey")
        }
        else {
            container.classList.add("unselected")
        }

        container.onclick = function () {
            localStorage.setItem("currentAccount", JSON.stringify(acc))
            location.reload()
        }

        let name = document.createElement("p")
        name.innerHTML = acc.name
        container.appendChild(name)

        textInfo.appendChild(container)
    }
}


//PAGE FEATURES -----------------------------------------
const editNameBtn = document.getElementById("change-info-tab").querySelector("p").querySelector("span")

function changeName() {
    visivleChangeInfoTab()
    changeInfoTab.querySelector("form").addEventListener("submit", function () {
        if (mainInput.value.trim().length != 0) {
            account.name = changeInfoTab.querySelector("input").value
            accountsList[index].name = changeInfoTab.querySelector("input").value

            localStorage.setItem("currentAccount", JSON.stringify(account))
            localStorage.setItem("userAccounts", JSON.stringify(accountsList))
            notice("Changed successfully!", true)
        }
        else {
            notice("No change was applied", false)
        }
    })
}

function visivleChangeInfoTab() {
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("input").value = account.name
}

function hideChangeInfoTab() {
    changeInfoTab.style.display = "none"
}

// CHECK IF THE PASSWORD IS CORRECT THEN DISPLAY IT
function checkUser(visiblePassBtn, passContainer) {
    changeInfoTab.querySelector("p").innerHTML = "Enter your password"

    if (visiblePassBtn.innerHTML != "visibility") {
        changeInfoTab.style.display = "flex"

        changeInfoTab.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault()
            if (mainInput.value == account.pass) {
                hideChangeInfoTab()
                passContainer.innerHTML = "<b>Password: </b> &ensp;" + account.pass + "&ensp;"
                visiblePassBtn.innerHTML = "visibility"
                passContainer.appendChild(visiblePassBtn)
            }
            else {
                hideChangeInfoTab()
                notice("Wrong password", false)
            }
        })
    }
    else {
        visiblePassBtn.innerHTML = "visibility_off"
        passContainer.innerHTML = "<b>Password: </b> &ensp;" + "*".repeat(account.pass.length) + "&ensp;"
        passContainer.appendChild(visiblePassBtn)
    }

}

// CHANGE CURRENT ACCOUNT PASSWORD
function changePass() {
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("p").innerHTML = `Enter your old password<span onclick="hideChangeInfoTab()">x</span>`

    changeInfoTab.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault()
        if (mainInput.value == account.pass) {
            changeInfoTab.querySelector("p").innerHTML = `Enter your new password<span onclick="hideChangeInfoTab()">x</span>`

            changeInfoTab.querySelector("form").addEventListener("submit", async function () {
                console.log(mainInput.value)
                if (mainInput.value.trim() != 0 && mainInput.value != account.pass) {
                    account.pass = mainInput.value
                    accountsList[index].pass = mainInput.value

                    localStorage.setItem("currentAccount", JSON.stringify(account))
                    localStorage.setItem("userAccounts", JSON.stringify(accountsList))

                    hideChangeInfoTab()
                    notice("Change password successfully!", true)
                }
                else {
                    notice("No change was applied!", true)
                    hideChangeInfoTab()
                }
            })
        }
        else {
            hideChangeInfoTab()
            notice("Wrong password!", true)
        }
    })
}

// CREATE A SHOP FUNCTION
function createShop() {
    textInfo.replaceChildren()
    let shopsList = JSON.parse(localStorage.getItem("currentAccount")).shops || []

    // load page
    let form = document.createElement("form")
    form.classList.add("create-shop-form", "darkgrey")

    let shopName = document.createElement("input")
    shopName.type = "text"
    shopName.required = "true"
    shopName.placeholder = "Name of your shop"
    form.appendChild(shopName)

    let shopDescribe = document.createElement("textarea")
    shopDescribe.placeholder = "Description of your shop"
    form.appendChild(shopDescribe)

    let shopAvtInput = document.createElement("input")
    shopAvtInput.id = "shop-avt-input"
    shopAvtInput.style.cssText = "opacity:0; z-index: -1; position:absolute;"
    shopAvtInput.type = "file"

    let url = "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"

    let previewImg = document.createElement("img")
    previewImg.src = url
    form.appendChild(previewImg)

    // get uploaded img url
    shopAvtInput.onchange = function (e) {
        getBase64(shopAvtInput.files[0], function (imgURL) {
            previewImg.src = imgURL
            url = imgURL
        })
    }
    form.appendChild(shopAvtInput)

    let label = document.createElement("label")
    label.setAttribute("for","shop-avt-input")
    label.style.cssText = "cursor:pointer; color: white;"
    label.innerHTML = '<span class="material-symbols-outlined">attach_file</span>'
    form.appendChild(label)

    let submit = document.createElement("input")
    submit.type = "submit"
    form.appendChild(submit)

    form.onsubmit = function (e) {
        e.preventDefault()
        shopsList.push({
            name: shopName.value,
            info: shopDescribe.value,
            cover: url
        })
        account["shops"] = shopsList
        accountsList[index]["shops"] = shopsList

        localStorage.setItem("currentAccount", JSON.stringify(account))
        localStorage.setItem("userAccounts", JSON.stringify(accountsList))

        notice("Your shop is added!", false)
    }

    textInfo.appendChild(form)
}
// LOAD CHOSEN SHOP (POST PRODUCT...)
function loadShopInside(shop) {
    textInfo.replaceChildren()

    let createProductBtn = document.createElement("span")
    createProductBtn.classList.add("align-center")
    createProductBtn.style.cssText = "cursor:pointer; position:absolute; top: 30px; left:30px; font-weight:bold;"
    createProductBtn.innerHTML = "<span class='material-symbols-outlined'>new_window</span>" + "Create a product"
    let shopIndex = account.shops.findIndex((x) => x === shop)
    createProductBtn.onclick = function () { createProduct(shopIndex) }
    textInfo.appendChild(createProductBtn)

    if (shop.products && shop.products[0]) {
        let productsContainer = document.createElement("div")
        productsContainer.id = "shops-list"

        for (let product of shop.products) {
            let container = document.createElement("div")
            container.classList.add("darkgrey", "shop-container")

            let productName = document.createElement("p")
            productName.innerHTML = product.name
            container.appendChild(productName)

            let productImg = document.createElement("img")
            productImg.src = product.img
            container.appendChild(productImg)

            productsContainer.appendChild(container)
            textInfo.appendChild(productsContainer)
        }
    }
    else {
        let p = document.createElement("p")
        p.innerHTML = "No product yet."
        textInfo.appendChild(p)
    }
}

function createProduct(shopIndex) {
    textInfo.replaceChildren()

    // load page
    let form = document.createElement("form")
    form.classList.add("create-shop-form", "darkgrey")

    let productName = document.createElement("input")
    productName.type = "text"
    productName.required = "true"
    productName.placeholder = "Name of your product"
    form.appendChild(productName)

    let productDescribe = document.createElement("textarea")
    productDescribe.placeholder = "Description of your product"
    form.appendChild(productDescribe)

    let productPrice = document.createElement("input")
    productPrice.type = "number"
    productPrice.min = "0"
    productPrice.placeholder = "Price of your product ($)"
    form.appendChild(productPrice)

    let productImgInput = document.createElement("input")
    productImgInput.id = "product-img-input"
    productImgInput.style.cssText = "opacity:0; z-index: -1; position:absolute;"
    productImgInput.type = "file"

    // get img url
    let url = "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"

    let previewImg = document.createElement("img")
    previewImg.src = url
    form.appendChild(previewImg)

    productImgInput.onchange = function (e) {
        getBase64(productImgInput.files[0], function (imgURL) {
            previewImg.src = imgURL
            url = imgURL
        })
    }
    form.appendChild(productImgInput)

    let label = document.createElement("label")
    label.setAttribute("for","product-img-input")
    label.style.cssText = "cursor:pointer; color: white;"
    label.innerHTML = '<span class="material-symbols-outlined">attach_file</span>'
    form.appendChild(label)

    let submit = document.createElement("input")
    submit.type = "submit"
    form.appendChild(submit)

    form.onsubmit = function (e) {
        e.preventDefault()
        let productsList = JSON.parse(localStorage.getItem("currentAccount")).shops[index].products || []
        console.log(typeof (productsList))
        productsList.push({
            name: productName.value,
            info: productDescribe.value,
            price:productPrice.value,
            img: url
        })

        account.shops[shopIndex]["products"] = productsList
        accountsList[index].shops[shopIndex]["products"] = productsList

        localStorage.setItem("currentAccount", JSON.stringify(account))
        localStorage.setItem("userAccounts", JSON.stringify(accountsList))

        notice("Your product is added!", false)
    }

    textInfo.appendChild(form)
}

// ADD USER PRODUCTS && SHOPS INTO SHOP PAGE
function addAll() {
    let accounts = JSON.parse(localStorage.getItem("userAccounts"))

    for (let account of accounts) {
        for (let shop of account.shops) {
            for (let product of shop.products) {
                products.push({
                    name: product.name,
                    describe: product.info,
                    img: product.img,
                    price: product.price || 0,
                    shop: shop,
                    shopImg: shop.cover,
                    more: shop.info,
                })
                console.log(product)
            }
        }
    }
}

addAll()
