
function send() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/Meucci4Africa/Backend/login.php", true);

    xhr.onload = function() {
        alert(xhr.response);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}
