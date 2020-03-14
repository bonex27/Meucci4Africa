
function send() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/Meucci4Africa/Backend/login.php", true);

    xhr.onload = function() {
        var obj = JSON.parse(xhr.response);
        scriviCookie(obj[0].idUtente,60);
        window.open("home.html","_self");

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
function cancellaCookie()
{
  scriviCookie(idUtente,'',-1);
}