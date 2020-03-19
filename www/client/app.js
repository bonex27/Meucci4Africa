/*
###APP LOAD###
*/

let levelsToApp = 0;    //DEBUG ONLY. Use if app.html is not at the root of the website (eg: localhost/somefolder/app.html)
                        //Specify how many levels there are to reach it (1 for the previous example)
let appTitle;
let appContainer;
let appNavbar;

function load()
{
    var path = window.location.pathname;
    var pathSplit = path.split("/");
    var pathLength = pathSplit.length;

    appTitle = document.getElementById("appTitle");
    appContainer = document.getElementById("appContainer");
    appNavbar = document.getElementById("appNavbar");

    //NAVBAR
    //Put this in a function and slam it at the bottom??
    var isLoggedRequest = new XMLHttpRequest();
    isLoggedRequest.open("GET", "/API/isLogged.php", false); //Apparently this is bad?
    isLoggedRequest.send();

    var isLogged = eval(isLoggedRequest.response);

    if(!isLogged)
    {
        appNavbar.innerHTML = "";
        
        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link clickable";
        navLink.innerHTML="Login"
        navLink.setAttribute("href", "login");
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);

        
        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link clickable";
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
        navLink.className="nav-link clickable";
        navLink.addEventListener("click", 
                                function() {
                                            history.pushState({},"Meucci4Africa", "/home");
                                            loadHome();
                                        } );
        navLink.innerHTML="I tuoi corsi";
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);

        var navItem = document.createElement("li");
        navItem.className="nav-item";

        var navLink = document.createElement("a");
        navLink.className="nav-link clickable";
        navLink.addEventListener("click", logout);
        navLink.innerHTML="Esci";
        navItem.appendChild(navLink);

        appNavbar.appendChild(navItem);
    }
    //till here?

    //TITLE     
    let pathTopLevel = pathSplit[1 + levelsToApp];
    let corso = pathSplit[2 + levelsToApp];

    appTitle.innerHTML = "";  

    switch(pathTopLevel)
    {
        case "corsi":
        {
            if(corso != undefined && corso != "")
            {
                loadCorso(corso);
            }
            else
            {
                listCorsi();
            }
        }break;
        case "home":
        {
            loadHome();
        }break;
        case "login":
        {
            loadLogin();
        }break;
        case "signup":
        {
            loadSignUp();
        }break;
        default:
        {
            loadIndex();
        }break;
    }
}

window.addEventListener("popstate", load);
window.addEventListener("load", load);

/*
###INDEX###
*/

function loadIndex()
{
    appTitle.innerHTML = "<a class='unclickable text-black'>Meucci for Africa</a>";
    appContainer.innerHTML = "<img src='/img/logo.png' class='rounded' alt='LOGO'>";
}

/*
###LISTA CORSI###
*/

function listCorsi()
{
    let title;

    appTitle.innerHTML = "";

    title = document.createElement("a");
    title.addEventListener("click",
                        function() {
                                    history.pushState({},"Meucci4Africa", "/home");
                                    loadHome();
                                });
    title.className = "clickable text-black";
    title.innerHTML = "Home -> ";
    appTitle.appendChild(title);

    title = document.createElement("a");
    title.className = "unclickable text-black";
    title.innerHTML = "Corsi";
    appTitle.appendChild(title);

    appContainer.innerHTML="";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/API/corsi.php", true);

    xhr.onload = function()
    {
        var obj = JSON.parse(xhr.response);
        console.log( obj.length);
        for(var i = 0; i< obj.length; i++)
        {
            var title = document.createElement("h3");
            var description = document.createElement("h4");

            title.setAttribute("style", "font-weight: bold");
            title.className = "clickable";
            title.innerHTML = obj[i].titolo;

            let id = obj[i].idArgomento;
            title.addEventListener("click",
                                    function()
                                    {
                                        clickCorso(id)
                                    });

            description.innerHTML = obj[i].descrizione;

            appContainer.appendChild(title);
            appContainer.appendChild(description);
        }
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
    history.pushState({},"Meucci4Africa", "/corsi/" + id);
    loadCorso(id);
}

function loadCorso(id)
{
    appTitle.innerHTML = "";
    var chiamataSingola = '/API/corsi.php?id='+ id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataSingola, true);
    xhr.onload = function()
    {
        let title;
        var obj = JSON.parse(xhr.response);
    
        title = document.createElement("a");
        title.addEventListener("click",
                            function() {
                                        history.pushState({},"Meucci4Africa", "/home");
                                        loadHome();
                                    } );
        title.className = "clickable text-black";
        title.innerHTML = "Home -> ";
        appTitle.appendChild(title);
    
        title = document.createElement("a");
        title.addEventListener("click", 
                            function() {
                                        history.pushState({},"Meucci4Africa", "/corsi");
                                        listCorsi();
                                    } );
        title.className = "clickable text-black";
        title.innerHTML = "Corsi -> ";
        appTitle.appendChild(title);

        title = document.createElement("a");
        title.className = "unclickable text-black";
        title.innerHTML = obj[0].titolo;
        appTitle.appendChild(title);

        var page = "<h3 id='title' style='font-weight: bold'>"+obj[0].titolo+"<h3>";
        page += "<h4 id='desc'>"+obj[0].descrizione+"</h4>";
        page +=  '<select id="inputLezione" class="custom-select mr-sm-2" required></select>';
        page += '<br><br><button type="button"  class="btn btn-danger" onclick="callIscriviti()">Iscriviti</button>';
        appContainer.innerHTML = page;
        loadTurni(id);
    };
    xhr.onerror = function() {
        alert("Errore");
    };
   
    xhr.send();

}

function loadTurni(argomento)
{
    var chiamataInfo = '/API/lezioni.php?idArgomento='+ argomento;
    var callInfo = new XMLHttpRequest();
    callInfo.open("GET", chiamataInfo, true);
    callInfo.onload = function()
    {
        let option;
        var turni = JSON.parse(callInfo.response);

        for (var i = 0; i < turni.length; i++)
        {
            option = document.createElement('option');
            option.text = turni[i].idTurno + turni[i].oraInizio;
            option.value = turni[i].idLezione;
            document.getElementById("inputLezione").add(option);
        }

    };
    callInfo.onerror = function()
    {
        alert("Errore");
    };
    callInfo.send();
}


function callIscriviti()
{
    id = document.getElementById("inputLezione").value;
    var chiamataIscrizione = '/API/iscrizioni.php?id='+ id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataIscrizione, true);
    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            alert("Sei già iscritto ad una lezione durante questo turno");
        }
        else
        {
            history.pushState({},"Meucci4Africa", "/home");
            loadHome();
        }
    };
    xhr.onerror = function() {
        alert("Errore");
    };
    xhr.send();
}


/*
###LOGOUT###
*/

function logout()
{
  var xhr = new XMLHttpRequest();
    xhr.open("GET", '/API/esci.php' , true);

    xhr.onload = function()
    {
        history.pushState({},"Meucci4Africa", "/index");
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
    appTitle.innerHTML = "<a class='unclickable text-black'>Login</a>";
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

function login()
{
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var obj = { email: email, password: password };
    var myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/API/login.php", true);

    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            alert("Password o email non validi");
        }
        else
        {
            history.pushState({},"Meucci4Africa", "/home");
            loadHome();
        }
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send(myJSON);
}


/*
###SIGN UP###
*/


function loadSignUp()
{
    appTitle.innerHTML = "<a class='unclickable text-black'>Registrazione</a>";
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
    xhr.open("POST", "/API/registrazione.php", true);

    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            alert("Errore!");
        }
        else
        {
            history.pushState({},"Meucci4Africa", "/login");
            loadLogin();
        }
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send(myJSON);
}


/*
###HOME###
*/

function loadHome()
{
    appTitle.innerHTML = "<a class='unclickable text-black'>Home</a>";
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
    xhr.open("GET", '/API/mieiCorsi.php' , true);
    xhr.onload = function()
    {
        var data = JSON.parse(xhr.response);
        let tr, td, button;

        for(var i = 0; i < data.length; i++)
        {
            tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + data[i].idTurno + '</td>' +
                '<td>' + data[i].Titolo + '</td>' +
                '<td>' + data[i].oraInizio + '</td>' +
                '<td>' + data[i].oraFine + '</td>'+
                '<td>' + data[i].nomeAula + '</td>';
            td = document.createElement("td");
            button = document.createElement("button");

            let iscrizione = data[i].idIscrizione;
            let lezione = data[i].idLezione;
            
            button.className = "btn btn-danger";
            button.addEventListener("click",
                                    function()
                                    {
                                        delIscrizione(iscrizione, lezione);
                                    });
            button.innerHTML="x";

            td.appendChild(button);
            tr.appendChild(td);
            table.appendChild(tr);
        }

        button = document.createElement("button");

        button.className = "btn btn-success";
        button.addEventListener("click",
                                function()
                                {
                                    history.pushState({},"Meucci4Africa", "/corsi");
                                    listCorsi();
                                });
        button.innerHTML = "Vai ai corsi";

        appContainer.appendChild(button);
        
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
}

/*
###UNSUBSCRIBE###
*/

function delIscrizione(iscrizione,lezione)
{
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", '/API/iscrizioni.php/?id='+iscrizione+"&idLezione="+lezione , true);
    xhr.onload = loadHome;
    xhr.onerror = function()
    {
        alert("Errore");
    };

    xhr.send();
}