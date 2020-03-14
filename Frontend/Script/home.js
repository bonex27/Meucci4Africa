function loadTable()
{
    var callCorsi ="http://localhost:80/Meucci4Africa/Backend/mieiCorsi.php?id="+leggiCookie('idUtente');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", callCorsi , true);//aggiungere id utente!!

    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        var table = document.getElementById('corsiSeguiti');
        for(var i = 0; i < data.length; i++)
        {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + data[i].idTurno + '</td>' +
                '<td>' + data[i].oraInizio + '</td>' +
                '<td>' + data[i].oraFine + '</td>' +
                '<td>' + data[i].nomeAula + '</td>';
            table.appendChild(tr);
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();

    
}
function leggiCookie(nomeCookie)
{
  if (document.cookie.length > 0)
  {
    var inizio = document.cookie.indexOf(nomeCookie + "=");
    if (inizio != -1)
    {
      inizio = inizio + nomeCookie.length + 1;
      var fine = document.cookie.indexOf(";",inizio);
      if (fine == -1) fine = document.cookie.length;
      return unescape(document.cookie.substring(inizio,fine));
    }else{
       return "";
    }
  }
  return "";
}
function cancellaCookie()
{
  scriviCookie(idUtente,'',-1);
}