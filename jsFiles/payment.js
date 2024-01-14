const list = document.getElementById("list")
let currentAccount = JSON.parse(localStorage.getItem("currentAccount")) || {}
const beforeDiscount = document.getElementById("before-discount")
const amount = document.getElementById("total")
const vouchers = document.getElementById("vouchers")
const table = document.getElementById("table")
const minus= document.getElementById("minus")
const payForm = document.getElementById("form")
const paymentInfo = document.getElementById("customer-payment-info")
const cancel = document.getElementById("cancel")
const payMethod = document.getElementById("pay-method")

let Total = 0
let discount = 0
let move = false

if (currentAccount) {
    const cart = currentAccount.cart || []

    for (let item of cart) {
        let container = document.createElement("tr")

        let itemName = document.createElement("td")
        itemName.innerHTML = `<b>${item.name}</b>`
        container.appendChild(itemName)

        let itemQuantity = document.createElement("td")
        itemQuantity.style.textAlign="center"
        itemQuantity.innerHTML = item.quantity
        container.appendChild(itemQuantity)

        let price = document.createElement("td")
        price.style.textAlign="end"
        let tempPrice = item.price * 1000 * item.quantity
        Total += tempPrice
        price.innerHTML = addSpaceForPrice(tempPrice.toString())+ "vnd"
        container.appendChild(price)

        table.appendChild(container)
    }
}
// receipt total
beforeDiscount.innerHTML += addSpaceForPrice(Total.toString()) + " vnd"
amount.innerHTML += addSpaceForPrice((Total - discount).toString()) + " vnd"

function loadVouchers() {
    for (let voucher of voucherList) {

        let card = document.createElement("div")
        card.classList.add("voucher")
        card.style.backgroundImage = `url(${voucher.image})`

        let voucherName = document.createElement("p")
        voucherName.innerHTML = voucher.name
        card.appendChild(voucherName)

        let discountAmount = document.createElement("span")
        discountAmount.innerHTML = voucher.discount + "%"
        card.appendChild(discountAmount)

        vouchers.appendChild(card)
    }

}
loadVouchers()

let cards = vouchers.querySelectorAll(".voucher")

for (let card of cards) {

    card.addEventListener("click", function () {
 
        if (!move) {
            move = true
        }
        else {
            move = false
        }
        
        moveObj(card, move)
    })
}


function moveObj(obj, move) {

    obj.addEventListener("click",function(){
        move = false
        if(obj.getBoundingClientRect().left > list.getBoundingClientRect().left && obj.getBoundingClientRect().right < list.getBoundingClientRect().right){
            if(obj.getBoundingClientRect().top > list.getBoundingClientRect().top && obj.getBoundingClientRect().bottom < list.getBoundingClientRect().bottom){
                discount = (100 - (obj.querySelector("span").innerHTML.slice(obj.querySelector("span").length,2))) /100
 
                minus.innerHTML = "-" + addSpaceForPrice((Total - Math.round(Total * discount)).toString()) + " vnd"
                Total = Math.round(Total * discount)
   
                amount.innerHTML = `<b>Total: </b>${addSpaceForPrice(Total.toString())}` + " vnd"
                obj.style.display = "none"
            }
        }
        else{
            obj.style.position = "relative"
            obj.style.margin= "10px 0"
            obj.style.top = "0"
            obj.style.left = "0"
        }
    })

    document.addEventListener("mousemove", function (event) {

        if (move) {
            obj.style.margin = "0"
            obj.style.position = "absolute"

            let mX = event.clientX
            let mY = event.clientY

            obj.style.top = mY + "px"
            obj.style.left = mX - obj.getBoundingClientRect().width / 2 + "px"
        }

    })
}

function addSpaceForPrice(str){
    let newstr = ""

    while (str.length>3){
        newstr = "." + str.slice(-3) + newstr 
        str = str.slice(0,-3)
    }
    newstr = str + newstr

    return newstr
}

payForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // automatically reset payment method
    payMethod.value = "none"
    if(payMethod.value == "after-delivered"){
        alert("Deliver soon")
    }
    else{
        window.open("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42", "_blank")
    }
})

cancel.addEventListener("click", function () {
    document.getElementById("address-input").value = ""
})
