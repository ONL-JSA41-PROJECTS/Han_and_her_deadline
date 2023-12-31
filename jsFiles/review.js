let reviewItem = JSON.parse(localStorage.getItem("userReview")) || []
let userCart = JSON.parse(localStorage.getItem("userCart")) || []
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
let temp = 0

// visible product information
let productImage = document.createElement("img")
productImage.src = reviewItem.img
productContainer.appendChild(productImage)

price.innerHTML = addSpaceForPrice((reviewItem.price * 1000).toString()) + " vnđ"
productName.innerHTML = reviewItem.name
describe.innerHTML = reviewItem.describe
more.innerHTML = reviewItem.more

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
    let accountIndex = accountsList.findIndex(elm => elm.name == account.name && elm.pass == account.pass)
    let index = accountsList[accountIndex].cart.findIndex(item => item.name == reviewItem.name)

    if (index == -1) {
        currentQuantity.innerHTML += "0"
    }
    else {
        temp = accountsList[accountIndex].cart[index].quantity
        currentQuantity.innerHTML = `Current quantity: ${accountsList[accountIndex].cart[index].quantity}`
    }
}


// add to cart
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
                more: reviewItem.more
            })

            account.cart.push({
                name: reviewItem.name,
                img: reviewItem.img,
                price: reviewItem.price,
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
        tb()        // let user knows if the item is added or not
    }
    else {
        window.location.href = "../pages/login.html"
        alert("Please sign in to add this item into your cart")
    }
})

// buy without adding to cart
pay.addEventListener("click", function () {
    paymentInfo.style.display = "block"

    // automatically reset payment method
    payMethod.value = "none"

    form.addEventListener("submit", function () {
        paymentInfo.style.display = "none"
        alert("Deliver soon")
    })
})
cancel.addEventListener("click", function () {
    paymentInfo.style.display = "none"
})

payMethod.addEventListener("change", function () {
    if (payMethod.value == "credit-card") {
        window.open("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42", "_blank")
    }
})

// thêm dấu chấm sau mỗi 3 số
function addSpaceForPrice(str) {
    let newstr = ""

    while (str.length > 3) {
        newstr = "." + str.slice(-3) + newstr
        str = str.slice(0, -3)
    }
    newstr = str + newstr

    return newstr
}

function rate(){
    for(let i in stars){
        stars[i].addEventListener("click",function(){
            // xóa all check 
            for(let star of stars){
                try{
                    star.classList.remove("checked")
                }
                catch{}
            }

            // check mấy cái phía trước
            let j = i
            while(j>=0){
                stars[j].classList.add("checked")
                j--
            }
        })
    }
}
rate()