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
        var obj = JSON.parse(xhr.response);
        scriviCookie(obj.idUtente,60);
        window.open("home.html");
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}
function scriviCookie(valoreCookie,durataCookie)
{
  var scadenza = new Date();
  var adesso = new Date();
  scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 60000));
  document.cookie = "idUtente" + '=' + escape(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}