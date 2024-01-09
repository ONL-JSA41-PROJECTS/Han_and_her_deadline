const form = document.getElementById("form")
const inputName = document.getElementById("name")
const inputPass = document.getElementById("pass")
let accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []

form.addEventListener("submit",function (e) {
    e.preventDefault()
    if (JSON.parse(localStorage.getItem("userAccounts")) && JSON.parse(localStorage.getItem("userAccounts"))[0]) {
        checkInfo()
    }
    else {
        window.location.href = "../pages/signup.html"
        alert("There's no account")
    }
})

function saveInfo(){
    accountsList[remember]=true
    localStorage.setItem("userAccounts",JSON.stringify(accountsList))
}

function checkInfo(){
    for(let info of accountsList){
        if(document.getElementById("name").value == info.name && document.getElementById("pass").value == info.pass){
            if (document.getElementById("remember").checked){
                saveInfo()
            }
            localStorage.setItem("currentAccount", JSON.stringify(info))
            window.location.href="../pages/shop.html"
            alert("Hope you have a nice time")
        }
        else{
         
        }
    }
}

// // sign in with gg

  function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

window.handleCredentialResponse = (response) => {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    inputName.innerHTML = responsePayload.name
    inputPass.innerHTML = responsePayload.sub
}