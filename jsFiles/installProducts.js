let userAddedProducts = JSON.parse(sessionStorage.getItem("addedProducts")) || []

// install products
for(let product of products){
        let item=document.createElement("div")
        item.classList.add("col","yellow")
    
        let infor=document.createElement("div")
        infor.classList.add("infor")
    
        let name=document.createElement("p")
        name.innerHTML=product.name
        name.setAttribute("onlick","createNews()")
        infor.appendChild(name)
        
        let hr= document.createElement("hr")
        infor.appendChild(hr)
    
        let describe=document.createElement("span")
        describe.innerHTML=product.describe
        infor.appendChild(describe)
    
        item.appendChild(infor)
    
        let pic=document.createElement("img")
        pic.src=product.img
        item.appendChild(pic)

        list.appendChild(item)
}

for(let product of userAddedProducts){
    let item=document.createElement("div")
        item.classList.add("col","yellow")
    
        let infor=document.createElement("div")
        infor.classList.add("infor")
    
        let name=document.createElement("p")
        name.innerHTML=product.name
        name.setAttribute("onlick","createNews()")
        infor.appendChild(name)
        
        let hr= document.createElement("hr")
        infor.appendChild(hr)
    
        let describe=document.createElement("span")
        describe.innerHTML=product.describe
        infor.appendChild(describe)
    
        item.appendChild(infor)
    
        let pic=document.createElement("img")
        pic.src=product.img
        item.appendChild(pic)

        list.appendChild(item)
}
