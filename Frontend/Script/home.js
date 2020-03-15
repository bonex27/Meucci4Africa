function loadTable()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:80/Meucci4Africa/Backend/mieiCorsi.php' , true);
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        var table = document.getElementById('corsiSeguiti');

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>Turno</td>' +
            '<td>Corso</td>' +
            '<td>Inizio</td>' +
            '<td>Fine</td>' +
            '<td>Aula</td>';
        
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
