const container=document.getElementById("container")
const account = JSON.parse(localStorage.getItem("currentAccount")) || {}
const accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
let review

let index = accountsList.findIndex( elm => elm.name == account.name && elm.pass == account.pass)

// create item in cart
function createItemBlock(){
    for(let item of accountsList[index].cart){
        let block=document.createElement("div")
        block.classList.add("block","yellow")

        block.addEventListener("dblclick",function(){
            review = {
                name: item.name,
                img: item.img,
                price: item.price,
                quantity: item.quantity,
                more: item.more
            }
            localStorage.setItem("userReview",JSON.stringify(review))
            window.location.href="./review.html"
        })

        let info=document.createElement("div")
        info.classList.add("info")

        let itemName=document.createElement("h1")
        itemName.innerHTML = item.name +"<br><br>"
        info.appendChild(itemName)

        let hr =document.createElement("hr")
        info.appendChild(hr)

        let itemPrice = document.createElement("i")
        itemPrice.innerHTML = "<br>" + item.price * 1000 + " vnđ"
        info.appendChild(itemPrice)

        let itemQuantity = document.createElement("p")
        itemQuantity.innerHTML = "Quantity: " + item.quantity
        info.appendChild(itemQuantity)

        let x = document.createElement("span")
        x.classList.add("remove")
        x.innerHTML="x"
        x.addEventListener("click",function(){
            container.removeChild(block)
            accountsList[index].cart.splice(accountsList[index].cart.indexOf(item),1)
            account.cart.splice(account.cart.indexOf(item),1)
            localStorage.setItem("userAccounts",JSON.stringify(accountsList))
            localStorage.setItem("currentAccount",JSON.stringify(account))
        })
        info.appendChild(x)
        block.appendChild(info)

        // !! always the last !!!
        let itemImage=document.createElement("img")
        itemImage.src=item.img
        block.appendChild(itemImage)

        container.appendChild(block)
    }
}
createItemBlock()
