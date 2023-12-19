let reviewItem = JSON.parse(localStorage.getItem("userReview")) || []
let userCart = JSON.parse(localStorage.getItem("userCart")) || []

const productContainer = document.getElementById("product-container")
const productName=document.getElementById("name")
const price = document.getElementById("price")
const btn=document.getElementById("btn")

let productImage=document.createElement("img")
productImage.src = reviewItem.img
productContainer.appendChild(productImage)

price.innerHTML = reviewItem.price * 1000 +" vnđ"
productName.innerHTML=reviewItem.name

// add to cart
btn.addEventListener("click",function(){
    userCart.push({
        name: reviewItem.name,
        img: reviewItem.img,
        price: reviewItem.price,
    })
    localStorage.setItem("userCart",JSON.stringify(userCart))
})