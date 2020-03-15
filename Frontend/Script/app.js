/*
###APP LOAD###
*/

function load()
{
    var url = window.location.href;
    var urlSplit = url.split("/");
    var urlLength = urlSplit.length;

    if(urlSplit[urlLength-1]=="corsi")
    {
        listCorsi();
    }
    else if(urlSplit[urlLength-1]=="login")
    {
        loadLogin();
    }
    else if(urlSplit[urlLength-1]=="signup")
    {
        loadSignUp();
    }
    else if(urlSplit[urlLength-1]=="home")
    {
        loadHome();
    }
    else
    {
        loadCorso(urlSplit[urlLength-1]);
    }
}
window.onpopstate = load;


/*
###LISTA CORSI###
*/

function listCorsi()
{
    document.getElementById("appTitle").innerHTML="Corsi"
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:80/Meucci4Africa/Backend/corsi.php", true);

    xhr.onload = function()
    {
        var obj = JSON.parse(xhr.response);
        console.log( obj.length);
        var page = "";
        for(var i = 0; i< obj.length; i++)
        {
            page +="<h3 style='font-weight: bold' onclick='clickCorso("+obj[i].idArgomento+")'>"+obj[i].titolo+"<h3>";
            page += "<h4 id='desc'>"+obj[i].descrizione+"</h4>";
        }
        document.getElementById("appContainer").innerHTML = page;
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
}


/*
###CORSO SINGOLO###
*/


function clickCorso(id)
{
    history.pushState({},"Meucci4Africa", "http://localhost:80/Meucci4Africa/Frontend/corsi/" + id);
    loadCorso(id);
}

function loadCorso(id)
{
    var chiamataSingola = 'http://localhost:80/Meucci4Africa/Backend/corsi.php?id='+ id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataSingola, true);
    xhr.onload = function()
    {
        var page = "";
        var obj = JSON.parse(xhr.response);
        document.getElementById("appTitle").innerHTML=obj[0].titolo;
        page += "<h3 id='title' style='font-weight: bold'>"+obj[0].titolo+"<h3>";
        page += "<h4 id='desc'>"+obj[0].descrizione+"</h4>";
        document.getElementById("appContainer").innerHTML = page;
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
   
    var chiamataInfo = 'http://localhost:80/Meucci4Africa/Backend/lezioni.php?id='+ id;
    var callInfo = new XMLHttpRequest();
    callInfo.open("GET", chiamataInfo, true);
    callInfo.onload = function()
    {
        var obj = JSON.parse(callInfo.response);
        //aggiungi informazioni
    };
    callInfo.onerror = function()
    {
        alert("Errore");
    }; 
    xhr.send();
    callInfo.send();
    
}


/*
###EXIT###
*/

function delSession()
{
  var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:80/Meucci4Africa/Backend/esci.php' , true);

    xhr.onload = function()
    {
        window.open('../../index.html',"_self");
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
}

/*
###LOGIN###
*/

function loadLogin()
{
    document.getElementById("appContainer").innerHTML = 
'<form class="form-signin" method="GET" id="form">'+
    '<h1 class="h3 mb-3 font-weight-normal">Sign in</h1>'+
    '<label for="inputEmail" class="sr-only">Email</label>'+
    '    <input type="text" id="inputEmail" class="form-control" placeholder="Email address" name="email" required>'+
    '<label for="inputPassword" class="sr-only">Password</label>'+
    '    <input type="password" id="inputPassword" class="form-control" name="password" placeholder="password" required>'+
    '<input type="button" class="btn btn-outline-success my-2 my-sm-0" onclick="login()" value="login"/>'+
    '<p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>'+
'</form>';
}

function login() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/Meucci4Africa/Backend/login.php", true);

    xhr.onload = function() {
        if(xhr.status != 200)
        {
            alert("Password o email non validi");
        }
        else
        {
            history.pushState({},"Meucci4Africa", "http://localhost:80/Meucci4Africa/Frontend/home");
            loadHome();
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}


/*
###SIGN UP###
*/


function loadSignUp()
{
    document.getElementById("appContainer").innerHTML = 
    '<form class="form-signin">' +
    '    <h1 class="h3 mb-3 font-weight-normal">Registrazione</h1>' +
    '    <label for="inputName" class="sr-only">Nome</label>' +
    '        <input type="text" id="inputName" class="form-control" placeholder="Nome" name="nome" required>' +
    '    <label for="inputSurname" class="sr-only">Cognome</label>' +
    '        <input type="text" id="inputSurname" class="form-control" placeholder="Cognome" name="cognome" required>' +
    '    <label for="inputEmail" class="sr-only">Email</label>' +
    '        <input type="text" id="inputEmail" class="form-control" placeholder="Email" name="email" required>' +
    '    <label for="inputPassword" class="sr-only">Password</label>' +
    '        <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required>' +
    '        <input type="button" class="btn btn-outline-success my-2 my-sm-0" onclick="signUp()" value="Iscriviti"/>' +
    '        <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>' +
    '</form>';
}


function signUp() {
    var nome = document.getElementById("inputName").value;
    var cognome = document.getElementById("inputSurname").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { nome: nome, cognome: cognome, email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:80/meucci4africa/Backend/registrazione.php", true);

    xhr.onload = function() {
        //SBAGLIATO, CONTROLLARE ERRORE
        history.pushState({},"Meucci4Africa", "http://localhost:80/Meucci4Africa/Frontend/login");
        loadLogin();
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send(myJSON);
}


/*
###HOME###
*/

function clickIscriviti()
{
    history.pushState({},"Meucci4Africa", "http://localhost:80/Meucci4Africa/Frontend/corsi");
    listCorsi();
}

function loadHome()
{
    document.getElementById("appContainer").innerHTML="";

    var table = document.createElement("table");
    var thead = document.createElement("thead");
    table.setAttribute("class", "table");
    thead.setAttribute("class", "thead-dark");
    table.appendChild(thead);
    document.getElementById("appContainer").appendChild(table);

    var tr = document.createElement('tr');
    tr.innerHTML =
        '<td>Turno</td>' +
        '<td>Corso</td>' +
        '<td>Inizio</td>' +
        '<td>Fine</td>' +
        '<td>Aula</td>';

    thead.appendChild(tr);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:80/Meucci4Africa/Backend/mieiCorsi.php' , true);
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);

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
        document.getElementById("appContainer").innerHTML+='<button type="button" onclick="clickIscriviti()" class="btn btn-success">Iscriviti</button>';
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}
