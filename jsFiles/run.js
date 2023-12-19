const sound = document.getElementById("sound")
const items = document.querySelectorAll(".col")
const topper = document.getElementById("topper")
const search=document.getElementById("search")
const searchInput=document.getElementById("searchInput")

const home=document.getElementById("home")
home.addEventListener("click",function(){
    window.location.href="../index.html"
})
// other features
let inReview = false

document.addEventListener("click", async function (e) {
    e.preventDefault()
    await sound.play()
})

// review product
for (let i = 0; i< items.length; i++) {
    items[i].addEventListener("click", function (e) {
        e.preventDefault()
        addToReview(i)
        window.location.href="../pages/review.html"
    })
}

// add to cart 
function addToReview(i){
    let userReview=
        {
            name : products[i].name,
            img: products[i].img,
            price: products[i].price
        }
    localStorage.setItem("userReview",JSON.stringify(userReview))
}

// search products
search.addEventListener("click",function(){
    searchItem()
})
searchInput.addEventListener("keydown",function(e){
    searchItem()
})

// remove unicode, uppercase..
function normalize(str){
    return str
    .toLowerCase()
    .replace(/[^\x00-\x7F]/g, "");
}
function searchItem(){
    let items=document.querySelectorAll(".col")
    
    if(searchInput.value != ""){
        
        for(let item of items){
            console.log("đâsd")
            if(normalize(item.querySelector("p").innerHTML).includes(normalize(searchInput.value))){
                try{
                    item.classList.remove("hidden")
                    console.log(item)
                }
                catch{}
            }
            else{
                item.classList.add("hidden")
            }
        }
    }
    else{
        for(let item of items){
            try{
                item.classList.remove("hidden")
            }
            catch{}
        }
    }
}