/*
###APP LOAD###
*/

let appTitle;
let appContainer;
let appNavbar;

function load()
{
    var url = window.location.href;
    var urlSplit = url.split("/");
    var host = urlSplit[2];
    var urlLength = urlSplit.length;

    appTitle = document.getElementById("appTitle");
    appContainer = document.getElementById("appContainer");
    appNavbar = document.getElementById("appNavbar");

    //Put this in a function?
    var isLoggedRequest = new XMLHttpRequest();
    isLoggedRequest.open("GET", host + "/api/isLogged.php", false)
    isLoggedRequest.send();

    var isLogged = eval(isLoggedRequest.response);

    if(!isLogged)
    {
        appNavbar.innerHTML = "";
        
        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link";
        navLink.innerHTML="Login"
        navLink.setAttribute("href", "login");
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);

        
        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link";
        navLink.innerHTML="Registrati"
        navLink.setAttribute("href", "signup");
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);
    }
    else
    {
        appNavbar.innerHTML = "";
        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link";
        navLink.addEventListener("click", logout);
        navLink.innerHTML="Esci";
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);
    }
    //till here?


    if(urlSplit[urlLength-1]=="index")
    {
        loadIndex();
    }
    else if(urlSplit[urlLength-1]=="corsi")
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
###INDEX###
*/

function loadIndex()
{
    appTitle.innerHTML = "Meucci4Africa";
    appContainer.innerHTML = "<img src='/img/logo.png' class='rounded' alt='LOGO'>";
}

/*
###LISTA CORSI###
*/

function listCorsi()
{
    appTitle.innerHTML="Corsi";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + "/api/corsi.php", true);

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
        appContainer.innerHTML = page;
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
    history.pushState({},"Meucci4Africa", host + "/corsi/" + id);
    loadCorso(id);
}

function loadCorso(id)
{
    var chiamataSingola = host + '/api/corsi.php?id='+ id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataSingola, true);
    xhr.onload = function() {
        
        var obj = JSON.parse(xhr.response);
        appTitle.innerHTML=obj[0].titolo;
        var page = "<h3 id='title' style='font-weight: bold'>"+obj[0].titolo+"<h3>";
        page += "<h4 id='desc'>"+obj[0].descrizione+"</h4>";
        page +=  '<select id="inputLezione" class="custom-select mr-sm-2" required></select>';
        page += '<br><br><button type="button"  class="btn btn-danger" onclick="callIscriviti()">Iscriviti</button>';
        appContainer.innerHTML = page;
        callLezioni(id);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
   
    xhr.send();

}

function callLezioni(id)
{
    var chiamataInfo = host + '/api/lezioni.php?idArgomento='+ id;
    var callInfo = new XMLHttpRequest();
    callInfo.open("GET", chiamataInfo, true);
    callInfo.onload = function() {
        var obj = JSON.parse(callInfo.response);
        loadLezioni(obj);

    };
    callInfo.onerror = function() {
        alert("Errore");
    };
    callInfo.send();
}

function loadLezioni(lezioni) {
    let option;

    for (var i = 0; i < lezioni.length; i++) {

        option = document.createElement('option');
        option.text = lezioni[i].idTurno + lezioni[i].oraInizio;
        option.value = lezioni[i].idLezione;
        document.getElementById("inputLezione").add(option);
    }
}

function callIscriviti()
{
    id = document.getElementById("inputLezione").value;
    var chiamataIscrizione = host + '/api/iscrizioni.php?id='+ id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataIscrizione, true);
    xhr.onload = function() {
        alert(xhr.response);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}


/*
###EXIT###
*/

function logout()
{
  var xhr = new XMLHttpRequest();
    xhr.open("GET", host + '/api/esci.php' , true);

    xhr.onload = function()
    {
        history.pushState({},"Meucci4Africa", host + "/index");
        load();
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
    appTitle.innerHTML = "Login"
    appContainer.innerHTML = 
'<form class="form-signin" method="GET" id="form">'+
    '<h1 class="h3 mb-3 font-weight-normal">Sign in</h1>'+
    '<label for="inputEmail" class="sr-only">Email</label>'+
    '    <input type="text" id="inputEmail" class="form-control" placeholder="Email address" name="email" required>'+
    '<label for="inputPassword" class="sr-only">Password</label>'+
    '    <input type="password" id="inputPassword" class="form-control" name="password" placeholder="password" required>'+
    '<input type="button" class="btn btn-outline-success my-2 my-sm-0" onclick="login()" value="Login"/>'+
    '<p class="mt-4 text-muted">&copy; 2019-2020</p>'+
'</form>';
}

function login() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + "/api/login.php", true);

    xhr.onload = function() {
        if(xhr.status != 200)
        {
            alert("Password o email non validi");
        }
        else
        {
            history.pushState({},"Meucci4Africa", host + "/home");
            load();
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
    appContainer.innerHTML = 
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
    '        <p class="mt-4 text-muted">&copy; 2019-2020</p>' +
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
    xhr.open("POST", host + "/api/registrazione.php", true);

    xhr.onload = function() {
        //SBAGLIATO, CONTROLLARE ERRORE
        history.pushState({},"Meucci4Africa", host + "/login");
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
    history.pushState({},"Meucci4Africa", host + "/corsi");
    listCorsi();
}

function loadHome()
{
    appContainer.innerHTML="";

    var table = document.createElement("table");
    var thead = document.createElement("thead");
    table.setAttribute("class", "table");
    thead.className = "thead-dark";
    table.appendChild(thead);
    document.getElementById("appContainer").appendChild(table);

    var tr = document.createElement('tr');
    tr.innerHTML =

        '<th>Turno</th>' +

        '<th>Corso</th>' +
        '<th>Inizio</th>' +
        '<th>Fine</th>' +
        '<th>Aula</th>'+

        '<th>Disiscriviti</th>';


    thead.appendChild(tr);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + '/api/mieiCorsi.php' , true);
    xhr.onload = function() {
        var data = JSON.parse(xhr.response);

        for(var i = 0; i < data.length; i++)
        {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + data[i].idTurno + '</td>' +
                '<td>' + data[i].Titolo + '</td>' +
                '<td>' + data[i].oraInizio + '</td>' +
                '<td>' + data[i].oraFine + '</td>'+
                '<td>' + data[i].nomeAula + '</td>'+
             '<td style="text-align: center;"><button type="button" class="btn btn-danger" onclick="delIscrizione('+data[i].idIscrizione+', '+ data[i].idLezione+')">-</button></td>';

                '<td><button type="button" class="btn btn-danger" onclick="delIscrizione('+data[i].idIscrizione+', '+ data[i].idLezione+')">x</button></td>';
            table.appendChild(tr);
        }
        appContainer.innerHTML+='<button type="button" onclick="clickIscriviti()" class="btn btn-success">Iscriviti</button>';
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}
/*
###Disiscrizione###
*/
function delIscrizione(iscrizione,lezione)
{
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", host + '/api/iscrizioni.php/?id='+iscrizione+"&idLezione="+lezione , true);
    xhr.onload = function() {
        loadHome();
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}