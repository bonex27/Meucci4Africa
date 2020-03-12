create database meucci4africa;
use meucci4africa;


CREATE TABLE utente
(idUtente INT PRIMARY KEY AUTO_INCREMENT
,nome VARCHAR(100) NOT NULL
,cognome VARCHAR(100) NOT NULL
,email VARCHAR(255) NOT NULL UNIQUE
,password CHAR(32) NOT NULL);

create table argomento
(idArgomento INT PRIMARY KEY AUTO_INCREMENT
,titolo VARCHAR(100) NOT NULL
,descrizione VARCHAR(1000) NOT NULL
);

create table aula
(idAula INT PRIMARY KEY AUTO_INCREMENT
,codiceAula varchar(5) NOT NULL
,nomeAula varchar(20) NOT NULL
);

create table turno
(idTurno INT PRIMARY KEY AUTO_INCREMENT
,oraInizio datetime NOT NULL
,oraFine datetime NOT NULL
);

CREATE table lezione
(idLezione INT PRIMARY KEY AUTO_INCREMENT
,aula int NOT NULL
,argomento int NOT NULL
,turno int NOT NULL
,postiLiberi int NOT NULL
,postiOccupati int NOT NULL
,foreign key (aula) references aula(idAula)
,foreign key (argomento) references argomento(idArgomento)
,foreign key (turno) references turno(idTurno)
);