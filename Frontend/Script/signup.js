function send() {
    var nome = document.getElementById("inputName").value;
    var cognome = document.getElementById("inputSurname").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { nome: nome, cognome: cognome, email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/meucci4africa/Backend/registrazione.php", true);

    xhr.onload = function() {
        window.open("login.html","_self");
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}
