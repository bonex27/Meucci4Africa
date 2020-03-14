function loadTable()
{

    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:80/Meucci4Africa/Backend/mieiCorsi.php' , true);

    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        var table = document.getElementById('corsiSeguiti');
        for(var i = 0; i < data.length; i++)
        {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + data[i].idTurno + '</td>' +
                '<td>' + data[i].Titolo + '</td>' +
                '<td>' + data[i].oraInizio + '</td>' +
                '<td>' + data[i].oraFine + '</td>'+
                '<td>' + data[i].nomeAula + '</td>';
            table.appendChild(tr);
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();

    
}
function delSession()
{
  var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:80/Meucci4Africa/Backend/esci.php' , true);

    xhr.onload = function() {
        window.open('../index.html',"_self");
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}

