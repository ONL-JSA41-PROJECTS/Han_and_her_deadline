const container=document.getElementById("container")

// create item in cart
function createItemBlock(){
    let userCart = JSON.parse(localStorage.getItem("userCart")) || []

    for(let item of userCart){
        let block=document.createElement("div")
        block.classList.add("block","yellow")

        let info=document.createElement("div")

        let itemName=document.createElement("p")
        itemName.innerHTML = item.name
        info.appendChild(itemName)

        let itemPrice = document.createElement("i")
        itemPrice.innerHTML = item.price * 1000 + " vnđ"
        info.appendChild(itemPrice)

        let itemQuantity = document.createElement("p")
        itemQuantity.innerHTML = "Quantity: " + item.quantity
        info.appendChild(itemQuantity)
        block.appendChild(info)

        // !!! also the last !!!
        let itemImage=document.createElement("img")
        itemImage.src=item.img
        block.appendChild(itemImage)

        container.appendChild(block)
    }
}
createItemBlock()