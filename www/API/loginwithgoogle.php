<?php
require_once('../lib/google-api-php-client-2.4.1/vendor/autoload.php');

$client = new Google_Client();

//imposta variabile ambiente con file allegato nel messaggio precedente
putenv('GOOGLE_APPLICATION_CREDENTIALS=serviceAccount.json');

//istruzioni da inserire nel php di redirect dopo la login con google ouath
//decodifica token
$postdata = json_decode(file_get_contents("php://input"));
print_r($postdata);

// verifica token
$ver_token = $client->verifyIdToken($postdata->token);
echo $ver_token;
// ver token c’è il risultato della verifica del token: $ver_token['email'] contiene l’email dell’utente loggato

$serviceaccount = new Google_Client();
//fa riferimento al service account configurator con l’istruzione putenv
//il service account impostato in _meucciapp-serviceAccount.json è autorizzato solo per questo scope:
$serviceaccount->useApplicationDefaultCredentials();
$serviceaccount->setSubject('adminsoft@itismeucci.com');
$serviceaccount->setScopes(['https://www.googleapis.com/auth/admin.directory.user.readonly']);
// google directory service
$dirservice = new Google_Service_Directory($serviceaccount);
$user = $dirservice->users->get($ver_token['email']);
echo $user->orgUnitPath; //contiene /Studente oppure /Docente
 print_r($user);
?>