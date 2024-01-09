const form = document.getElementById("form")
const inputName = document.getElementById("name")
const inputPass = document.getElementById("pass")
let isExist = false

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let userInfo = JSON.parse(localStorage.getItem("userAccounts")) || []
    for (let info of userInfo) {
        if (document.getElementById("name").value == info.name && document.getElementById("pass").value == info.pass) {
    
            window.location.href = "../pages/login.html"
            alert("Your account is exist!")
            isExist = true
        }
    }
    if (!isExist) {
        userInfo.push({
            name: document.getElementById("name").value,
            pass: document.getElementById("pass").value,
            cart: []
        })
        window.location.href = "./login.html"
        alert("Your account can be used now!")
    }

    localStorage.setItem("userAccounts", JSON.stringify(userInfo))
})

// sign in with gg

try{
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
}
catch(err){}