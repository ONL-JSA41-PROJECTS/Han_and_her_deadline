
let reviewingShop = JSON.parse(sessionStorage.getItem("currentReviewingShop")) || []

document.title = reviewingShop.name || "No shop to review"

let link = document.createElement("link")
link.rel = "icon"
link.type = 'image/png'
link.href = reviewingShop.cover || "../assets/logo.png"

