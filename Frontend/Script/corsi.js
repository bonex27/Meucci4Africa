

function load() {
var string = '[{"id":0,"nome":"00-1E"},{"id":1,"nome":"01-1E"},{"id":2,"nome":"01-1M"},{"id":3,"nome":"02-1E"},{"id":4,"nome":"02-1M"},{"id":5,"nome":"02-2E"},{"id":6,"nome":"03-2E"},{"id":7,"nome":"04-1E"},{"id":8,"nome":"04-1M"},{"id":9,"nome":"04-2E"},{"id":10,"nome":"04A-TC"},{"id":11,"nome":"04B-TC"},{"id":12,"nome":"05-1M"},{"id":13,"nome":"05-TC"},{"id":14,"nome":"05-TW"},{"id":15,"nome":"06-1E"},{"id":16,"nome":"06-1M"},{"id":17,"nome":"06-2E"},{"id":18,"nome":"06-TE"},{"id":19,"nome":"07-1E"},{"id":20,"nome":"07-1W"},{"id":21,"nome":"07-TC"},{"id":22,"nome":"07-TW"},{"id":23,"nome":"08-1E"},{"id":24,"nome":"08-1M"},{"id":25,"nome":"08-2E"},{"id":26,"nome":"08-2W"},{"id":27,"nome":"08-TE"},{"id":28,"nome":"09-1E"},{"id":29,"nome":"09-1M"},{"id":30,"nome":"09-2E"},{"id":31,"nome":"09-TC"},{"id":32,"nome":"09-TW"},{"id":33,"nome":"10-1E"},{"id":34,"nome":"10-1M"},{"id":35,"nome":"10-2E"},{"id":36,"nome":"10-2W"},{"id":37,"nome":"11-1E"},{"id":38,"nome":"11-2E"},{"id":39,"nome":"11-TC"},{"id":40,"nome":"12-1E"},{"id":41,"nome":"12-2E"},{"id":42,"nome":"12-2W"},{"id":43,"nome":"12-SE"},{"id":44,"nome":"12-TW"},{"id":45,"nome":"13-1E"},{"id":46,"nome":"13-1W"},{"id":47,"nome":"13-2E"},{"id":48,"nome":"13-TC"},{"id":49,"nome":"14-2E"},{"id":50,"nome":"14-2W"},{"id":51,"nome":"14-TW"},{"id":52,"nome":"15-2E"},{"id":53,"nome":"16-TW"},{"id":54,"nome":"18-TW"},{"id":55,"nome":"ADEL 13-TE"},{"id":56,"nome":"ADIS 07-1M"},{"id":83,"nome":"AULA RICEVIMENTO 15-TC (01)"},{"id":84,"nome":"AULA RICEVIMENTO 15-TC (02)"},{"id":85,"nome":"AULA RICEVIMENTO 15-TC (03)"},{"id":86,"nome":"AULA RICEVIMENTO 15-TC (04)"},{"id":87,"nome":"BIBLIOTECA (01)"},{"id":88,"nome":"BIBLIOTECA (02)"},{"id":89,"nome":"BIBLIOTECA (03)"},{"id":90,"nome":"BIBLIOTECA (04)"},{"id":91,"nome":"BIBLIOTECA (05)"},{"id":92,"nome":"BIBLIOTECA (06)"},{"id":93,"nome":"BIBLIOTECA (07)"},{"id":94,"nome":"disposizione (01)"},{"id":95,"nome":"disposizione (02)"},{"id":96,"nome":"disposizione (03)"},{"id":97,"nome":"disposizione (04)"},{"id":98,"nome":"disposizione (05)"},{"id":60,"nome":"LAB SCIENZE 19-TE"},{"id":61,"nome":"LAC 06-TC"},{"id":62,"nome":"LAF1"},{"id":63,"nome":"LAF2"},{"id":64,"nome":"LAI 01-2W"},{"id":65,"nome":"LAI 2 14-1W"},{"id":66,"nome":"LAM"},{"id":67,"nome":"LAME 04-TE"},{"id":68,"nome":"LAP"},{"id":69,"nome":"LAS 07-2W"},{"id":70,"nome":"LASM"},{"id":71,"nome":"LAT 23-TM"},{"id":72,"nome":"LATI 05-2W"},{"id":73,"nome":"LEG 02-TE"},{"id":74,"nome":"LEIS"},{"id":75,"nome":"LOGISTICA 12-TE"},{"id":76,"nome":"MULTIMEDIA"},{"id":77,"nome":"MULTIMEDIA2"},{"id":99,"nome":"PAL (01)"},{"id":100,"nome":"PAL (02)"},{"id":101,"nome":"PAL (03)"},{"id":79,"nome":"PAL 2"},{"id":80,"nome":"PALAZZINA MECCANICA"},{"id":81,"nome":"SERVIZIO"},{"id":82,"nome":"VICEPRESIDENZA"}]';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:80/Meucci4Africa/Backend/argomento.php", true);

    xhr.onload = function() {
        const obj = JSON.parse(xhr.response);
        for(var i = 0; i< obj.lenght; i++)
        {
            var page ="<h3 id='title' style='font-weight: bold'><a href='http://localhost/meucci4africa/Frontend/argomento.php/" + obj[i].id + "' >"+obj[i].titolo+" </a></h3>";
            page += "<div id='desc'>"+obj[i].descrizione+"</div>";
            document.getElementById("titoloCorsi").value += page;
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}
