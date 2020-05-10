<?php
require_once('../lib/google-api-php-client-2.4.1/vendor/autoload.php');
include_once('class/logGoogle.php');
include_once('class/classe.php');
$client = new Google_Client();

//imposta variabile ambiente con file allegato nel messaggio precedente
putenv('GOOGLE_APPLICATION_CREDENTIALS=serviceAccount.json');

//istruzioni da inserire nel php di redirect dopo la login con google ouath
//decodifica token
$postdata = json_decode(file_get_contents("php://input"));


// verifica token
$ver_token = $client->verifyIdToken($postdata->token);

// ver token c’è il risultato della verifica del token: $ver_token['email'] contiene l’email dell’utente loggato

$serviceaccount = new Google_Client();
//fa riferimento al service account configurator con l’istruzione putenv
//il service account impostato in _meucciapp-serviceAccount.json è autorizzato solo per questo scope:
$serviceaccount->useApplicationDefaultCredentials();
$serviceaccount->setSubject('adminsoft@itismeucci.com');
$serviceaccount->setScopes(['https://www.googleapis.com/auth/admin.directory.user.readonly','https://www.googleapis.com/auth/admin.directory.group.readonly']);

$dirservice = new Google_Service_Directory($serviceaccount);
$user = $dirservice->users->get($ver_token['email']);
//echo $user->orgUnitPath; //contiene /Studente oppure /Docente
//print_r($user);

//$serviceaccount->setScopes(['https://www.googleapis.com/auth/admin.directory.group.readonly']);
//$dirservice = new Google_Service_Directory($serviceaccount);
$user = $dirservice->users->get($ver_token['email']);
//echo $user->orgUnitPath; //contiene /Studente oppure /Docente
$optParams = array('userKey' => $ver_token['email']);
$groups = $dirservice->groups->listGroups($optParams);

//print_r($groups);
$classId = new Classe();
for($i = 0; $i < count($groups["groups"]);$i++)
{
    $className = $groups["groups"][$i]["email"];
    if (strpos($className, 'studenti.') !== false) {
        $className =str_replace("studenti.", "", $className);
        $className =str_replace("@itismeucci.com", "", $className);
    break;
    }
}
echo $classId->getClassId($className);
$LG = new logGoogle($user->primaryEmail, $user->name->familyName,$user->name->givenName,$classId->getClassId($className));
session_start();
$_SESSION["id"] = $LG->checkJustLog();
?>