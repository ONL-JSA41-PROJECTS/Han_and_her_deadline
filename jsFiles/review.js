let reviewItem = JSON.parse(localStorage.getItem("userReview")) || []
let userCart = JSON.parse(localStorage.getItem("userCart")) || []

const productContainer = document.getElementById("product-container")
const productName=document.getElementById("name")
const price = document.getElementById("price")
const btn=document.getElementById("btn")
const describe = document.getElementById("describe")

let productImage=document.createElement("img")
productImage.src = reviewItem.img
productContainer.appendChild(productImage)

price.innerHTML = reviewItem.price * 1000 +" vnđ"
productName.innerHTML=reviewItem.name
describe.innerHTML = reviewItem.describe

// add to cart
btn.addEventListener("click",function(e){
    e.preventDefault()
    console.log(userCart)
    console.log(userCart.findIndex(item => item.name == reviewItem.name))
    let index = userCart.findIndex(item => item.name == reviewItem.name)
    if(index == -1){
        userCart.push({
            name: reviewItem.name,
            img: reviewItem.img,
            price: reviewItem.price,
            quantity: 1
        })
    }
    else{
        userCart[index].quantity+=1
    }
  
    localStorage.setItem("userCart",JSON.stringify(userCart))
})