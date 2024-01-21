let reviewItem = JSON.parse(localStorage.getItem("userReview")) || []
let addedPurchasesList = JSON.parse(sessionStorage.getItem("addedPurchasesItems")) || []
let userCart = JSON.parse(localStorage.getItem("userCart")) || []
let userAddedProducts = JSON.parse(sessionStorage.getItem("addedProducts")) || []
const accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
const account = JSON.parse(localStorage.getItem("currentAccount")) || {}

const productContainer = document.getElementById("product-container")
const productName = document.getElementById("name")
const price = document.getElementById("price")
const btn = document.getElementById("btn")
const describe = document.getElementById("describe")
const notification = document.getElementById("alert")
const currentQuantity = document.getElementById("quantity")
const more = document.getElementById("more").querySelector("p")
const pay = document.getElementById("pay")
const paymentInfo = document.getElementById("customer-payment-info")
const submit = document.getElementById("submit")
const form = document.getElementById("form")
const cancel = document.getElementById("cancel")
const payMethod = document.getElementById("pay-method")
const stars = document.getElementsByClassName("star")
const input = document.getElementById("input")
const rateForm = document.getElementById("rate-form")
const inputFile = document.getElementById("inputfile")
const rateImgContainer = document.getElementById("rate-img-container")
const shopImg = document.getElementById("shop-img")
const shopName = document.getElementById("shop-name")
const shopInfo = document.getElementById("shop-info")
let temp = 0


// DISPLAY SHOP INFO
shopName.innerHTML = reviewItem.shop || "SHOPNAME"
shopInfo.onclick = function(){
    console.log(reviewItem)
    window.location.href = "../pages/shopReview.html"
}
shopImg.src = reviewItem.shopImg || "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"

// visible product information
let productImage = document.createElement("img")
productImage.src = reviewItem.img
productContainer.appendChild(productImage)

price.innerHTML = addSpaceForPrice((reviewItem.price * 1000).toString()) + " vnđ"
productName.innerHTML = reviewItem.name
describe.innerHTML = reviewItem.describe
more.innerHTML = reviewItem.more

let accountIndex
let index

// after added to cart - notification
async function tb() {
    notification.style.width = "300px"
    notification.querySelector("p").style.opacity = "1"

    setTimeout(function () {
        notification.style.width = "0px"
        notification.querySelector("p").style.opacity = "0"
    }, 1000)

}
// get product's current quantity
if (JSON.parse(localStorage.getItem("userAccounts")) && JSON.parse(localStorage.getItem("currentAccount"))) {
    accountIndex = accountsList.findIndex(elm => elm.name == account.name && elm.pass == account.pass)
    index = accountsList[accountIndex].cart.findIndex(item => item.name == reviewItem.name)

    if (index == -1) {
        currentQuantity.innerHTML += "0"
    }
    else {
        temp = accountsList[accountIndex].cart[index].quantity
        currentQuantity.innerHTML = `Current quantity: ${accountsList[accountIndex].cart[index].quantity}`
    }
}

// ADD TO CART
btn.addEventListener("click", function (e) {
    e.preventDefault()

    if (JSON.parse(localStorage.getItem("currentAccount"))) {

        // add to cart - before procedure
        accountIndex = accountsList.findIndex(elm => elm.name == account.name && elm.pass == account.pass)
        index = account.cart.findIndex(item => item.name == reviewItem.name)

        temp += 1
        currentQuantity.innerHTML = `Current quantity: ${temp}`

        // add chosen item into user cart
        if (index == -1) {
            accountsList[accountIndex].cart.push({
                name: reviewItem.name,
                img: reviewItem.img,
                price: reviewItem.price,
                quantity: temp,
                shopImg: reviewItem.shopImg,
                shopName: reviewItem.shop,
                more: reviewItem.more
            })

            account.cart.push({
                name: reviewItem.name,
                img: reviewItem.img,
                price: reviewItem.price,
                quantity: temp,
                shopImg: reviewItem.shopImg,
                shopName: reviewItem.shop,
                more: reviewItem.more
            })
        }
        else {
            accountsList[accountIndex].cart[index].quantity = temp
            account.cart[index].quantity = temp
        }
        localStorage.setItem("userAccounts", JSON.stringify(accountsList))
        localStorage.setItem("currentAccount", JSON.stringify(account))
        tb()        // let user knows if the item is added or not
    }
    else {
        window.location.href = "../pages/login.html"
        alert("Please sign in to add this item into your cart")
    }
})

// QUICK PAYMENT (WITHOUT ADDING TO CART)
pay.addEventListener("click", function () {
    paymentInfo.style.display = "block"

    // automatically reset payment method
    payMethod.value = "none"

    form.addEventListener("submit", function (e) {
        e.preventDefault()

        if (payMethod.value == "after-delivered") {
            console.log(reviewItem.type)

                if (reviewItem.type == "original") {
                    let addedIndex = addedPurchasesList.findIndex(elm => elm.id == reviewItem.id)
    
                    if (addedIndex != -1) {
                            addedPurchasesList[addedIndex].purchases += 1
                            sessionStorage.setItem("addedPurchasesItems", JSON.stringify(addedPurchasesList))
                    }
                    else {
                        addedPurchasesList.push({
                            id:reviewItem.id,
                            name: products[reviewItem.productIndex].name,
                            purchases: 1,
                        })
                    }
    
                    sessionStorage.setItem("addedPurchasesItems", JSON.stringify(addedPurchasesList))
                }
                else{
                    let addedIndex  = addedPurchasesList.findIndex(elm => elm.id == userAddedProducts[reviewItem.productIndex].id)
    
                    if(addedIndex != -1){
                        addedPurchasesList[addedIndex].purchases += 1
                        sessionStorage.setItem("addedPurchasesItems", JSON.stringify(addedPurchasesList))
                    }
                    else{
                        addedPurchasesList.push({
                            id: userAddedProducts[reviewItem.productIndex].id,
                            name: userAddedProducts[reviewItem.productIndex].name,
                            purchases: 1,
                        })
                    }
    
                    sessionStorage.setItem("addedPurchasesItems", JSON.stringify(addedPurchasesList))
                }
    
            account.cart = []
            accountsList[accountIndex].cart = []
    
            localStorage.setItem("currentAccount", JSON.stringify(account))
            localStorage.setItem("userAccounts", JSON.stringify(accountsList))
    
            location.reload()
            alert("Deliver soon")
        }
        else if (payMethod.value == "none") {
            alert("Please choose a method")
        }
        else {
            window.open("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42", "_blank")
        }
    })
})
cancel.addEventListener("click", function () {
    paymentInfo.style.display = "none"
})

// ADD DOT FOR EVERY 3 UNITS
function addSpaceForPrice(str) {
    let newstr = ""

    while (str.length > 3) {
        newstr = "." + str.slice(-3) + newstr
        str = str.slice(0, -3)
    }
    newstr = str + newstr

    return newstr
}

// RATE (CLICK THE STAR)
for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
        // xóa all check 
        for (let star of stars) {
            try {
                star.classList.remove("checked")
            }
            catch { }
        }

        // check mấy cái phía trước
        let j = i
        while (j >= 0) {
            stars[j].classList.add("checked")
            j--
        }
    })
}

function returnProductName(name) {
    if (name == "Wine Connoiseurs"){
        return products[reviewItem.productIndex].name
    }
    return userAddedProducts[reviewItem.productIndex].name
}

// COMMENT 
let comments = JSON.parse(localStorage.getItem("commentsList")) || []

rateForm.addEventListener("submit", function (e) {
    e.preventDefault()
    // block if is not logged in
    if (!JSON.parse(localStorage.getItem("currentAccount"))) {
        window.location.href = "../pages/login.html"
        alert("Please log in to chat")
    }
    if (input.value != "" && input.value != " ") {
        comments.push({
            content: input.value,
            productName: returnProductName(reviewItem.shop),
            rate: document.getElementsByClassName("checked").length - 5,
            name: account.name,
            avt: account.avt,
            imgs: getImgURL(),
        })
    }
    localStorage.setItem("commentsList", JSON.stringify(comments))

    input.value = ""
    for (let i = 0; i < (document.getElementsByClassName("checked").length - 5); i++) {
        document.getElementsByClassName("checked")[i].classList.remove("checked")
    }
    location.reload()
})

// VISIBLE COMMENTS
const visibleRate = document.getElementById("visible-rate")
let choices = document.getElementsByClassName("choice")
comments = JSON.parse(localStorage.getItem("commentsList"))
console.log(comments)
// set default
choices[0].classList.add("chosen")
for (let com of comments) {

    if (com.productName == reviewItem.name) {
        createMessages(com, com.rate)
    }
}


function createMessages(comment) {
    let container = document.createElement("div")
    container.classList.add("message")

    let messContent = document.createElement("p")
    messContent.innerHTML = "&ensp;&ensp;" + comment.content
    container.appendChild(messContent)

    let avt = document.createElement("div")
    if(comment.avt){
        avt.style.backgroundImage = `url(${comment.avt})`
    }
    else{
        avt.style.backgroundImage = `url(https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg)`
    }

    avt.classList.add("avt")
    container.appendChild(avt)

    let starContainer = document.createElement("div")
    starContainer.classList.add("star-container")

    for (let i = 0; i < comment.rate; i++) {
        let star = document.createElement("span")
        star.classList.add("fa", "fa-star")
        starContainer.appendChild(star)
    }
    container.appendChild(starContainer)

    let imgContainer = document.createElement("div")
    imgContainer.classList.add("img-rate-container")

    for (let i in comment.imgs) {
        let newImage = document.createElement("img")
        newImage.src = comment.imgs[i]

        imgContainer.appendChild(newImage)
    }
    visibleRate.appendChild(container)
    visibleRate.appendChild(imgContainer)
}

for (let choice of choices) {
    choice.addEventListener("click", function () {
        // remove chosen previous
        for (let choice of choices) {
            if (choice.classList.contains("chosen")) {
                choice.classList.remove("chosen")
            }
        }
        visibleRate.replaceChildren()

        // visible which is chosen
        choice.classList.add("chosen")
        let starNum = parseInt(choice.innerHTML[0]) || 0

        for (let comment of comments) {
            if (comment.productName == reviewItem.name && comment.rate == starNum && starNum != 0) {
                createMessages(comment)
            }
            else if (starNum == 0) {
                visibleRate.replaceChildren()

                for (let com of comments) {
                    if(com.productName == reviewItem.name){
                        createMessages(com)
                    }
                }
            }
        }
    })
}

// VISIBLE COMMENT IMAGE

inputFile.addEventListener("change", function (e) {
    for (let file of e.target.files) {
        let previewImg = document.createElement("img")
        previewImg.classList.add("preview-img")

        let url = window.URL.createObjectURL(file)
        previewImg.src = url

        rateImgContainer.appendChild(previewImg)
    }
})


function getImgURL() {
    let imgs = rateImgContainer.querySelectorAll("img")
    let imgList = []
    for (let img of imgs) {
        imgList.push(img.src)
    }
    return imgList
}
