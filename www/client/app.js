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

    var isLoggedRequest = new XMLHttpRequest();
    isLoggedRequest.open("GET", "/API/isLogged.php", false); //TODO: get rid of this, aparently it's bad
    isLoggedRequest.send();

    var isLogged = eval(isLoggedRequest.response);

    loadNavbar(isLogged);

    let pathTopLevel = pathSplit[1 + levelsToApp];
    let corso = pathSplit[2 + levelsToApp];

    appTitle.innerHTML = "";  

    switch(pathTopLevel)
    {
        case "corsi":
        {
            if(!isLogged)   //NOTE: Perhaps save location and restore it after login?
            {
                history.pushState({},"Meucci4Africa", "/login");
                loadLogin();
            }
            else
            {
                if(corso != undefined && corso != "")
                {
                    loadCorso(corso);
                }
                else
                {
                    listCorsi();
                }
            }
        }break;
        case "home":
        {
            if(!isLogged)   //NOTE: Perhaps save location and restore it after login?
            {
                history.pushState({},"Meucci4Africa", "/login");
                loadLogin();
            }
            else
            {
                loadHome();
            }
        }break;
        case "login":
        {
            loadLogin();
        }break;
        case "signup":
        {
            loadSignUp();
        }break;

        case "newcorso":
        {
            newCorso();
        }break;
        case "profile":
        {
            loadProfile();

        }break;
        default:
        {
            history.replaceState({}, "Meucci4Africa", "/");
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
    appContainer.innerHTML = "<img style='float: left;' src='/img/logo.png' class='rounded' alt='LOGO'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ornare ante. Sed iaculis vulputate tellus. Morbi et mattis tellus, facilisis gravida tellus. Maecenas ut ex vel erat tempus tristique sed ac purus. Sed erat neque, bibendum eget sem at, pellentesque egestas mi. Donec iaculis vehicula justo, at pharetra libero tempor vel. Ut finibus hendrerit arcu id malesuada. Aenean posuere, leo nec tempus sodales, ante ipsum auctor purus, a laoreet odio velit eu tellus. Vivamus dictum orci nec fermentum ullamcorper. Nam sollicitudin convallis ex, non vulputate ante. Duis nec malesuada mi. Duis lacinia ante eget orci porta maximus. Quisque sit amet elementum dui. Mauris nec odio id metus sollicitudin rutrum et sed metus.</p><p></p><p>Sed euismod odio a ex dictum, et maximus magna dapibus. Sed commodo ante sagittis lacus molestie, sed commodo eros pulvinar. Nullam tristique, felis sed malesuada ullamcorper, sem quam maximus est, in pretium est justo id nisi. Nullam sit amet dui ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget suscipit libero, quis venenatis ligula. Vivamus malesuada id orci in tincidunt. Donec in sapien cursus, laoreet diam et, sollicitudin sem.</p><p></p><p>Nullam non bibendum eros, vel dictum ante. Praesent varius justo sed libero efficitur malesuada consequat vel massa. Nam et neque eu lorem pretium gravida. Cras facilisis gravida tincidunt. Mauris eget nulla ut elit ultrices vulputate ut a ante. Phasellus sit amet diam quis ligula sollicitudin porttitor. Etiam vel nunc eu est sodales venenatis in quis magna. Sed vitae augue lacinia, volutpat neque vitae, ullamcorper mi. Praesent volutpat erat odio, non malesuada nisi rhoncus eget. Curabitur magna erat, ullamcorper sit amet turpis nec, bibendum euismod dui. Praesent congue eleifend urna, vitae suscipit eros ultricies a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla eu cursus nisi, vel porttitor sapien. Cras a justo et metus laoreet porttitor.</p><p></p><p>Pellentesque feugiat scelerisque lectus in facilisis. Sed sed quam maximus, molestie mauris ut, ultricies tortor. Morbi nec finibus erat. Nulla lacus est, imperdiet id placerat vitae, volutpat varius erat. Morbi luctus dolor sem, in porttitor sapien molestie ac. Curabitur metus mauris, vehicula in euismod quis, gravida sit amet turpis. Phasellus massa mi, sodales quis convallis quis, faucibus tincidunt metus. Mauris nec nisl et nisl aliquet laoreet. Sed egestas ut orci eget finibus. Vestibulum consectetur at dolor et tincidunt. Duis semper egestas semper. Phasellus aliquam tempus cursus. Sed vel sapien nunc. Curabitur fermentum malesuada consequat. Suspendisse rutrum, erat ut euismod ultrices, arcu urna pellentesque libero, eu lobortis metus eros ac nulla. Maecenas vel dapibus leo, vel congue diam.</p><p></p><p>Ut facilisis suscipit quam ac malesuada. Etiam sit amet purus sapien. Suspendisse vitae lorem non sapien scelerisque efficitur. Etiam at est eget nulla molestie sollicitudin a in nisl. Donec auctor lacus gravida neque rutrum, vel lacinia lectus tincidunt. Nulla et vestibulum nisi. Proin id rutrum turpis. Fusce hendrerit urna in ullamcorper dapibus. Sed vitae ultrices leo. Phasellus eget ante eget sapien accumsan consequat.</p>";
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
        appContainer.innerHTML = page;
        var div = document.createElement("div");
        var table = document.createElement("table");
        table.id ="tableTurni";
        var thead = document.createElement("thead");
        table.setAttribute("class", "table");
        thead.className = "thead-dark";
        div.className = "scrollable";
        table.appendChild(thead);
        appContainer.appendChild(div);
        div.appendChild(table);

    
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<th>Turno</th>' +
            '<th>Orario</th>' +
            '<th>Posti Liberi</th>' +
            '<th>Aula</th>'+
            '<th>Iscriviti</th>';
        thead.appendChild(tr);
        
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

        
        var turni = JSON.parse(callInfo.response);
            let tr, td, button, table;
            table = document.getElementById("tableTurni");
    
            for(var i = 0; i < turni.length; i++)
            {
                tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + turni[i].idTurno + '</td>' +
                    '<td>' + turni[i].oraInizio.substr(11, 5) +" - "+turni[i].oraFine.substr(11, 5)+ '</td>' +
                    '<td>' + turni[i].postiliberi +"/"+turni[i].postioccupati+ '</td>'+
                    '<td>' + turni[i].nomeAula + '</td>';
                td = document.createElement("td");
                button = document.createElement("button");
                let lezione = turni[i].idLezione;
                
                button.className = "btn btn-success";
                if(turni[i].justS == 1)
                    button.className = 'btn btn-secondary disabled'
                else
                {
                button.addEventListener("click",
                                        function()
                                        {
                                            checkIscrizione(lezione);
                                        });
                }
                button.innerHTML="✓";
                                        
                td.appendChild(button);
                tr.appendChild(td);
                table.appendChild(tr);
            }

    };
    callInfo.onerror = function()
    {
        alert("Errore");
    };
    callInfo.send();
}

function checkIscrizione(lezione)
{
    document.getElementById('modalTitle').innerHTML ="Iscrizione";
    document.getElementById('modalBody').innerHTML ="Sei sicuro di volerti iscrivere?";
    document.getElementById('modalBtn').innerHTML ="No";
    
    let button = document.createElement("button");
    button.innerHTML="Si";
    button.className="btn btn-success";
    button.type ="button";
    button.id="modalBtnOk";
    button.addEventListener("click", function()
    {
        $('#modalAll').modal('hide');
        callIscriviti(lezione);
        

    });
    $('#modalAll').on('hidden.bs.modal', function (e) {
        $("#modalBtnOk" ).remove();
        document.getElementById('modalBtn').removeEventListener('click',list());
      })
    document.getElementById("modalFooter").appendChild(button);
    $('#modalAll').modal('show');
}

function callIscriviti(lezione)
{

    var chiamataIscrizione = '/API/iscrizioni.php?id='+ lezione;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chiamataIscrizione, true);
    xhr.onload = function()
    {
        if(xhr.status != 200)
        {
            document.getElementById('modalTitle').innerHTML ="Errore";
            document.getElementById('modalBody').innerHTML ="Sei gia iscritto a una lezione durante questo turno";
            document.getElementById('modalBtn').innerHTML ="Ok";
            $('#modalAll').modal('show');
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
        history.pushState({},"Meucci4Africa", "/");
        load();
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
}

function logGoogle()
{
    gapi.load('client', init);
}

function init() {
    var auth2 = gapi.auth2.init({client_id:'172278911634-3frggsillmspcdpbgvo8mtqqt70pnln8.apps.googleusercontent.com', hosted_domain:'itismeucci.com'});

    auth2.signIn().then(
    function(response) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST","./API/loginwithgoogle.php",true);
        xhr.onload = function(data, status, jqXHR)
        {
            console.log(data);
            history.pushState({},"Meucci4Africa", "/home");
            loadNavbar(true);
            loadHome();
        };
        xhr.onerror = function()
        {
            alert("err");
        };
        xhr.send(JSON.stringify({'token': response.getAuthResponse().id_token}));
    
    }
    );
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
    '<p class="mt-4 text-muted">oppure</p>'+
    '</form>'+
    '<br>'+
    '<a class="btn btn-outline-dark" onclick="logGoogle()" role="button" style="text-transform:none">'+
    '<img  width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />'+
    'Login with Google'+
    '</a>';
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
            loadNavbar(true);
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
    '    <label for="formGroupExampleInput">Nome:</label>' +
    '        <input type="text" id="inputName" class="form-control" placeholder="Nome" name="nome" required>' +
    '    <label for="formGroupExampleInput">Cognome</label>' +
    '        <input type="text" id="inputSurname" class="form-control" placeholder="Cognome" name="cognome" required>' +
    '    <label for="formGroupExampleInput">Email</label>' +
    '        <input type="text" id="inputEmail" class="form-control" placeholder="Email" name="email" required>' +
    '       <label for="formGroupExampleInput">Classe</label>' +
'            <select id="inputClasse" class="form-control" name="aula" required></select>' +
    '       <label for="formGroupExampleInput">Password</label>' +
    '        <input type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required>' +
    '       <label for="formGroupExampleInput">Verifica password</label>' +
    '        <input type="password" id="inputPasswordCheck" class="form-control" name="passwordCheck" placeholder="Password" required>' +
    '        <input type="button" class="btn btn-outline-success my-2 my-sm-0" onclick="signUp()" value="Iscriviti"/>' +
        '<p class="mt-4 text-muted">oppure</p>'+
    '</form>'+
    '<br>'+
    '<a class="btn btn-outline-dark" onclick="logGoogle()" role="button" style="text-transform:none">'+
    '<img  width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />'+
    'Login with Google'+
    '</a>';
    aule();
}

function aule()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/API/classi.php", true);

    xhr.onload = function()
    {
    const data = JSON.parse(xhr.response);
    let option;

    for (var i = 0; i < data.length; i++)
    {
        option = document.createElement('option');
        option.text = data[i].nome;
        option.value = data[i].id;
        document.getElementById("inputClasse").add(option);
    }
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
    
}

function signUp() {
    var nome = document.getElementById("inputName").value;
    var cognome = document.getElementById("inputSurname").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var passwordCheck = document.getElementById("inputPasswordCheck").value;
    var Classe = document.getElementById("inputClasse").value;
    var obj = { nome: nome, cognome: cognome, email: email, password: password, classe: Classe };
    var myJSON = JSON.stringify(obj);

    if(password == passwordCheck)
    {    
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
    else
    {

        document.getElementById('modalTitle').innerHTML ="Errore";
        document.getElementById('modalBody').innerHTML ="Le password non coincidono";
        $('#modalAll').modal('show');
    }
}


/*
###HOME###
*/

function loadHome()
{
    appTitle.innerHTML = "<a class='unclickable text-black'>Home</a>";
    appContainer.innerHTML="";

	var div = document.createElement("div");
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    table.setAttribute("class", "table");
    thead.className = "thead-dark";
	div.className = "scrollable";
    table.appendChild(thead);
	div.appendChild(table);
	appContainer.appendChild(div);

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
                '<td>' + data[i].oraInizio.substr(11, 5) + '</td>' +
                '<td>' + data[i].oraFine.substr(11, 5) + '</td>'+
                '<td>' + data[i].nomeAula + '</td>';
            td = document.createElement("td");
            button = document.createElement("button");

            let iscrizione = data[i].idIscrizione;
            let lezione = data[i].idLezione;
            
            button.className = "btn btn-danger";
            button.addEventListener("click",
                                    function()
                                    {
                                        checkDel(iscrizione,lezione);
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
function checkDel(iscrizione,lezione)
{
    document.getElementById('modalTitle').innerHTML ="Disiscrizione";
    document.getElementById('modalBody').innerHTML ="Sei sicuro di volerti disiscrivere?";
    document.getElementById('modalBtn').innerHTML ="No";
    document.getElementById('modalBtn').addEventListener("click", list);
    
    let button = document.createElement("button");
    button.innerHTML="Si";
    button.class="btn btn-primary";
    button.id="modalBtnOk";
    button.className="btn btn-danger";
    button.type ="button";
    button.addEventListener("click", function()
    { 
        $('#modalAll').modal('hide');
        delIscrizione(iscrizione,lezione);       
       

    });
    $('#modalAll').on('hidden.bs.modal', function (e) {
        $("#modalBtnOk" ).remove();
        document.getElementById('modalBtn').removeEventListener('click',list());
      })
    document.getElementById("modalFooter").appendChild(button);
    $('#modalAll').modal('show');
}
function list ()
{
    $("#modalBtnOk" ).remove();
        document.getElementById('modalBtn').removeEventListener('click',list);
}
function delIscrizione(iscrizione,lezione)
{
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", '/API/iscrizioni.php?id='+iscrizione+"&idLezione="+lezione , true);
    xhr.onload = loadHome;
    xhr.onerror = function()
    {
        alert("Errore");
    };

    xhr.send();
}

/*
###NAVBAR###
*/

function loadNavbar(isLogged)
{
    appNavbar.innerHTML = "";

    var navItem1 = document.createElement("li");
    var navLink1 = document.createElement("a");
    navItem1.className="nav-item";
    navLink1.className="nav-link clickable";

    var navItem2 = navItem1.cloneNode(false);
    var navLink2 = navLink1.cloneNode(false);

    var navItem3 = navItem1.cloneNode(false);
    var navLink3 = navLink1.cloneNode(false);

    if(!isLogged)
    {
        navLink1.innerHTML="Login"
        navLink1.addEventListener("click", 
                                function() {
                                            history.pushState({},"Meucci4Africa", "/login");
                                            loadLogin();
                                        } );
        navLink2.innerHTML="Registrati"
        navLink2.addEventListener("click", 
                                function() {
                                            history.pushState({},"Meucci4Africa", "/signup");
                                            loadSignUp();
                                        } );
        navItem1.appendChild(navLink1);
        navItem2.appendChild(navLink2);

        appNavbar.appendChild(navItem1);
        appNavbar.appendChild(navItem2);
    }
    else
    {
        navLink1.addEventListener("click", 
                                function() {
                                            history.pushState({},"Meucci4Africa", "/home");
                                            loadHome();
                                        } );
        navLink1.innerHTML="I tuoi corsi";

        navLink2.addEventListener("click", 
                                function() {
                                            history.pushState({},"Meucci4Africa", "/profile");
                                            loadProfile();
                                        } );
        navLink2.innerHTML="Il tuo profilo";

        navLink3.addEventListener("click", logout);
        navLink3.innerHTML="Esci";

        navItem1.appendChild(navLink1);
        navItem2.appendChild(navLink2);
        navItem3.appendChild(navLink3);

        appNavbar.appendChild(navItem1);
        appNavbar.appendChild(navItem2);
        appNavbar.appendChild(navItem3);
    }
    
    
}

/*
###PROFILO###
*/

function loadProfile()
{
    var button;

    appTitle.innerHTML = "<a class='unclickable text-black'>Il mio profilo</a>";

    appContainer.innerHTML =
    '<h2>Informazioni Personali</h2>' +
    '<span>Nome: </span><span id="nome"></span><br/>' +
    '<span>Cognome: </span><span id="cognome"></span><br/>' +
    '<span>Classe: </span><span id="classe"></span><br/>' +
    '<br/>' +
    '<h2>Account</h2>' +
    '<span>E-Mail: </span><span id="email"></span><br/>'+
    '<br/>' +
    '<div id="editProfile" style="margin-bottom: 0.5rem;">' +
    '</div>' +
    '<div id="deleteProfile" style="margin-bottom: 0.5rem;">' +
    '</div>';

    button = document.createElement("button");
    button.id = "btnEdit";
    button.className = "btn btn-primary";
    button.innerHTML = "Modifica Profilo";
    button.addEventListener("click",
                            function()
                            {
                                document.getElementById("editPsw").innerHTML = "modifica";
                                //TODO: Make other fields editable and enable apply button
                            });
    document.getElementById("editProfile").append(button);

    button = document.createElement("button");
    button.id = "btnApply";
    button.className = "btn btn-outline-secondary disabled";
    button.disabled = true;
    button.innerHTML = "Applica";
    button.addEventListener("click",
                            function()
                            {
                                
                            });
    document.getElementById("editProfile").append(button);

    button = document.createElement("button");
    button.id = "btnDelete";
    button.className = "btn btn-danger";
    button.innerHTML = "Elimina Account";
    button.addEventListener("click",
                            function()
                            {

                            });
    document.getElementById("deleteProfile").append(button);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/API/profilo.php");
    xhr.onload = function()
    {
        var profileInfo = JSON.parse(xhr.response)[0];
        document.getElementById("nome").innerHTML = profileInfo.nome;
        document.getElementById("cognome").innerHTML = profileInfo.cognome;
        document.getElementById("classe").innerHTML = profileInfo.classe;

        document.getElementById("email").innerHTML = profileInfo.email;
        if(profileInfo.authLevel > 0)
        {
            appContainer.insertAdjacentHTML('beforeend',
            '<h2>Admin</h2>' +
            '<div id="listIscritti" style="margin-bottom: 0.5rem;">' +
            '</div>' +
            '<div id="addCorso" style="margin-bottom: 0.5rem;">' +
            '</div>');

            button = document.createElement("button");
            button.id = "btnList";
            button.className = "btn btn-info";
            button.innerHTML = "Elenco Iscritti";
            button.addEventListener("click",
                                    function()
                                    {
                                        loadUserList();
                                        history.pushState({},"Meucci4Africa", "/users")
                                        
                                    });
            document.getElementById("listIscritti").append(button);

            button = document.createElement("button");
            button.id = "btnAdd";
            button.className = "btn btn-warning";
            button.innerHTML = "Aggiungi Corso";
            button.addEventListener("click",
                                    function()
                                    {
        								newCorso();
										history.pushState({},"Meucci4Africa", "/newcorso")
				
                                    });
            document.getElementById("addCorso").append(button);
        }
    };
    xhr.onerror = function(){alert("Errore di rete");}
    xhr.send();
}
function addCorso()
{
    var aula = document.getElementById("inputAula").value;
    var titolo = document.getElementById("inputCorso").value;
    var descrizione = document.getElementById("inputDescrizione").value;
    var turno1 = document.getElementById("turno1").checked;
    var turno2 = document.getElementById("turno2").checked;
    var turno3 = document.getElementById("turno3").checked;
    var turno4 = document.getElementById("turno4").checked;
    var postiLiberi = document.getElementById("inputPosti").value;

    var obj = { idAula: aula, titolo: titolo, descrizione: descrizione, turno1: turno1,turno2: turno2,turno3: turno3,turno4: turno4, postiLiberi: postiLiberi};
    var myJSON = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/API/nuoviCorsi.php' , true);
    xhr.onload = function()
    {
        alert("ok")
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send(myJSON);


}
function newCorso()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/API/aule.php' , true);
    xhr.onload = function()
    {
    
    appContainer.innerHTML= ' <div  id="form">'+
'       <label for="inputAula">Aula</label><br>'+
'       <select id="inputAula" class ="form-control"name="aula" required></select>'+
'       <label for="inputCorso" >Corso</label><br>'+
    '    <input type="text" id="inputCorso" class="form-control" name="corso" placeholder="Corso" required>'+
    
    '<label for="inputDescrizione" >Descrizione</label><br>'+
        '<textarea type="" id="inputDescrizione" class="form-control" name="descrizione" placeholder="Descrizione" required>'+
        '</textarea><br>'+

    '<label for="inputTurni">Turni:</label><br>'+
        '<input type="checkbox" id="turno1" name="turno1" class="form-check-label">'+
          '  <label for="turno1"> Turno 1</label>'+
       ' <input type="checkbox" id="turno2" name="turno2" class="form-check-label">'+
       '     <label for="turno2"> Turno 2</label>'+
       ' <input type="checkbox" id="turno3" name="turno3" class="form-check-label">'+
        '    <label for="turno3"> Turno 3</label>'+
      '  <input type="checkbox" id="turno4" name="turno4" class="form-check-label">'+
       '     <label for="turno4"> Turno 4</label>'+

   '<br> <label for="inputPosti" >Numero posti:</label>'+
    '    <input type="text" id="inputPosti" class="form-control" name="posti" placeholder="Numero Posti" required><br>'+

   ' <button  class="btn btn-outline-success my-2 my-sm-0" onclick="addCorso()" value="segna">Aggiungi</button>'+
'</div>';

var data = JSON.parse(xhr.response);
let option;

for (var i = 0; i < data.length; i++)
{
option = document.createElement('option');
option.text = data[i].nomeAula;
option.value = data[i].idAula;
document.getElementById("inputAula").add(option);
}
let title;
appTitle.innerHTML = "";
title = document.createElement("a");
title.className = "unclickable text-black";
title.innerHTML = "Corsi";
appTitle.appendChild(title);


        
    };
    xhr.onerror = function()
    {
        alert("Errore");
    };
    xhr.send();
}


/*
###LISTA CORSI###
*/

function loadUserList()
{
    appTitle.innerHTML = "<a class='unclickable text-black'>Tutti gli utenti</a>";

    appContainer.innerHTML= '<div id="utenti"></div>';
    appUtenti = document.getElementById("utenti");      
                var table = document.createElement("table");
                var thead = document.createElement("thead");
                table.setAttribute("class", "table");
                thead.className = "thead-dark";
                table.appendChild(thead);
                document.getElementById("appContainer").appendChild(table);
            
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<th>Nome</th>' +
                    '<th>Cognome</th>' +
                    '<th>Classe</th>' ;
                thead.appendChild(tr);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/API/utenti.php");
    xhr.onload = function()
        {
            var profileInfo = JSON.parse(xhr.response);
                    let tr, td, button;
            
                    for(var i = 0; i < profileInfo.length; i++)
                    {
                        tr = document.createElement('tr');
                        tr.innerHTML =
                            '<td>' +  profileInfo[i].nome + '</td>' +
                            '<td>' +  profileInfo[i].cognome + '</td>' +
                            '<td>' + profileInfo[i].classe + '</td>';
                        td = document.createElement("td");
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
            
        };
    xhr.onerror = function(){alert("Errore di rete");}
    xhr.send();
}