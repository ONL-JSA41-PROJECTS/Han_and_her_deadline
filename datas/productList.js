const list=document.getElementById("list")

let products=[
    {
        type: "original",
        name:"Traditional Red Wine",
        describe:"Tasteful, a bit spicy alike your ex",
        img:"../assets/products/red-wine.jpg",
        price: 130,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "This term can be used in two ways: favourably, to describe a pleasant, clean quality that adds complexity to aromas and flavours; and more unfavourably, to describe a ‘barnyard’ character that smells dirty and unpleasant."
    },
    {
        type: "original",
        name:"THE AVALON",
        describe:"Involves desiccating premium quality grapes. Capture the intense colour & flavour found in the skins",
        img:"../assets/products/avalon-2013.png",
        price: 269,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "The term ‘complex’ is used to describe a diverse wine that appears to change flavour from the moment you taste it to the moment you swallow it. It’s a bit of a cheat to call a wine ‘complex’ without identifying why, though!"
    },
    {
        type: "original",
        name:"White Wine",
        describe:"Tasteful, a bit spicy alike your ex",
        img:"../assets/products/white-wine.jpg",
        price: 299,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "This signifies the weight of the wine on your palate: the way it feels in your mouth, its heft and viscosity. Some experts suggest thinking of body the same way you would the difference between whole, semi-skimmed and skimmed milk. Full bodied wines fill your palate with texture and intensity, medium bodies wines (a term reserved for reds) are a good middle ground, and light bodied wines tend to be refreshing and tingly."
    },
    {
        type: "original",
        name:"Sauvignon Blanc",
        describe:"Only the purest free run juice was used to ferment.",
        img:"../assets/products/Sauvignon-Blanc.png",
        price: 459,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "The term ‘balance’ is usually very favourable as it suggests that the wine’s three main components – fruit, alcohol and acid – are working in harmony with one another. In red wines, tannin is also considered a core component."
    },
    {
        type: "original",
        name:"The Merlot 2018",
        describe:"Its vineyards are planted at 130m above sea-level in cool nutrient-rich Tukulu soil.",
        img:"../assets/products/Merlot-1.png",
        price: 999,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "The ‘legs’ of a wine are the streaks that trickle down the inside of a glass when the wine is swirled. They’re caused by alcohol, so the more prominent they are, the higher the alcohol content of the wine."
    },
    {
        type: "original",
        name:"Frans K Smit",
        describe:"Crafted in limited quantities, these two complex, nuanced blends are both coveted and enjoyed around the world.",
        img:"../assets/products/Spier-Frans-K-Smit.jpg",
        price: 1008,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "This signifies the weight of the wine on your palate: the way it feels in your mouth, its heft and viscosity. Some experts suggest thinking of body the same way you would the difference between whole, semi-skimmed and skimmed milk. Full bodied wines fill your palate with texture and intensity, medium bodies wines (a term reserved for reds) are a good middle ground, and light bodied wines tend to be refreshing and tingly."
    },
    {
        type: "original",
        name:"21 Gables",
        describe:"A range of single varietal wines that represent both the conditions of each vintage and the nuance of terroir.",
        img:"../assets/products/Spier-21-Gables.jpg",
        price: 1452,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "The ‘finish’ of a wine is the aftertaste it leaves once you’ve drunk it, and can have a big impact on the overall tasting experience. A wine may have a smooth finish, a smoky finish, a spicy finish, and so on. If a wine leaves a lingering aftertaste it’s said to have a ‘long finish’."
    },
    {
        type: "original",
        name:"True Pure Blueberries",
        describe:"Tasteful, a bit spicy alike your ex",
        img:"../assets/products/blueberry-soju.jpg",
        price: 599,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "Wines with full, pleasant flavours that are sweet and ‘rounded’ in nature are described as rich. In dry wines, richness may come from high alcohol, by complex flavours or by an oaky vanilla character. Decidedly sweet wines are also described as rich when the sweetness is backed up by fruity, ripe flavours."
    },
    {
        type: "original",
        name:"235 Creative Block",
        describe:"Combines and blends taste profiles to craft a South African take on traditional Rhône- and Bordeaux-style blends.",
        img:"../assets/products/Spier-Creative-Block.jpg",
        price: 599,
        shop:"Wine Connoiseurs Original",
        shopImg:"../assets/logo.png",
        more: "The opposite of big, bold and fruity wines. The term ‘elegant’ is used to describe understated wines with higher acidity and more ‘restrained’ characteristics. They often taste ‘tight’ when first released but tend to have good aging potential."
    },
    
]
