const container=document.getElementById("container")

// create item in cart
function createItemBlock(){
    let userCart = JSON.parse(localStorage.getItem("userCart")) || []

    for(let item of userCart){
        let block=document.createElement("div")
        block.classList.add("block","yellow")

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
        info.appendChild(x)
        block.appendChild(info)

        // !!! also the last !!!
        let itemImage=document.createElement("img")
        itemImage.src=item.img
        block.appendChild(itemImage)

        container.appendChild(block)
    }
}
createItemBlock()