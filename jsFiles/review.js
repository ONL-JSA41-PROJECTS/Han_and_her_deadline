let reviewItem = JSON.parse(localStorage.getItem("userReview")) || []
let userCart = JSON.parse(localStorage.getItem("userCart")) || []

const productContainer = document.getElementById("product-container")
const productName = document.getElementById("name")
const price = document.getElementById("price")
const btn = document.getElementById("btn")
const describe = document.getElementById("describe")
const notification = document.getElementById("alert")
const currentQuantity = document.getElementById("quantity")

// visible product information
let productImage = document.createElement("img")
productImage.src = reviewItem.img
productContainer.appendChild(productImage)

price.innerHTML = reviewItem.price * 1000 + " vnđ"
productName.innerHTML = reviewItem.name
describe.innerHTML = reviewItem.describe

let index = userCart.findIndex(item => item.name == reviewItem.name)
let temp = 0
 // get product's current quantity

if (index != -1) {
    temp = userCart[index].quantity
    currentQuantity.innerHTML= `Current quantity: ${userCart[index].quantity}`
}
else{
    currentQuantity.innerHTML+="0"
}
// after added to cart notification
async function tb() {
    notification.style.width = "300px"
    notification.querySelector("p").style.opacity = "1"

    setTimeout(function () {
        notification.style.width = "0px"
        notification.querySelector("p").style.opacity = "0"
    }, 1000)

}
// add to cart
btn.addEventListener("click", function (e) {
    e.preventDefault()
    temp+=1
    console.log(index)
    currentQuantity.innerHTML= `Current quantity: ${temp}`
    index = userCart.findIndex(item => item.name == reviewItem.name)
    if (index == -1) {
        userCart.push({
            name: reviewItem.name,
            img: reviewItem.img,
            price: reviewItem.price,
            quantity: temp
        })
    }
    else {
        userCart[index].quantity = temp
    }
    localStorage.setItem("userCart", JSON.stringify(userCart))
    
    tb()
})