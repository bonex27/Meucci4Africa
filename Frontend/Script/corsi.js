
var idCorso = "";
function load() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:80/Meucci4Africa/Backend/corsi.php", true);

    xhr.onload = function() {
        var obj = JSON.parse(xhr.response);
        console.log( obj.length);
        for(var i = 0; i< obj.length; i++)
        {
            var page ="<h3 id='title' style='font-weight: bold' onclick='corsoScelto("+obj[i].idArgomento+")'>"+obj[i].titolo+"<h3>";
            page += "<h4 id='desc'>"+obj[i].descrizione+"</h4>";
            document.getElementById("titoloCorsi").innerHTML += page;
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}

function corsoScelto(id)
{
    document.getElementById("titoloCorsi").innerHTML = "";
    var xhr = new XMLHttpRequest();
    var chiamataSingola = 'http://localhost:80/Meucci4Africa/Backend/corsi.php?id='+ id;

    xhr.open("GET", chiamataSingola, true);

    xhr.onload = function() {
        var obj = JSON.parse(xhr.response);
            var page ="<h3 id='title' style='font-weight: bold'>"+obj[0].titolo+"<h3>";
            page += "<h4 id='desc'>"+obj[0].descrizione+"</h4>";
            document.getElementById("titoloCorsi").innerHTML += page;
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
    
}