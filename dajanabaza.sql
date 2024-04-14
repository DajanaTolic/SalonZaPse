use master;
go
drop database if exists salon_za_pse;
go
create database salon_za_pse collate Croatian_CI_AS;
go
use salon_za_pse;

create table korisnici(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
pasmina varchar(50) not null,
kilaza decimal(18,2),
vlasnik varchar(50) not null
);

create table tretmani(
sifra int not null primary key identity(1,1),
datum datetime,
korisnikid int not null
);

create table stavke(
sifra int not null primary key identity(1,1),
tretmanid int not null,
uslugaid int not null,
kolicina int not null
);

create table usluge(
sifra int not null primary key identity(1,1),
trajanje int not null, -- u minutama
cijena decimal (18,2),
naziv varchar(50) not null
);

alter table tretmani add foreign key (korisnikid) references korisnici(sifra);
alter table stavke add foreign key (tretmanid) references tretmani(sifra);
alter table stavke add foreign key (uslugaid) references usluge(sifra);


insert into korisnici (ime,pasmina,kilaza,vlasnik)
values ('Floki','šnaucer',5,'Matko Boras'),
('Bobi','njemaèkadoga',20,'Ivana Janješiæ'),
('Zen','hrt',7,'Bojan Serdar'),
('Hana','bigl',6,'Renata Božiæ'),
('Oliver','škotski ovèar',8,'Katarina Kneif');


insert into tretmani(korisnikid, datum)
values (1,'2024-08-07 12:00:00'),
(1,'2024-08-07 13:00:00'),
(2,'2024-08-07 15:00:00'),
(3,'2024-08-07 17:00:00'),
(3,'2024-08-07 19:00:00');

insert into usluge(trajanje, cijena,naziv)
values (60,20,'rezanje noktiju'),
(120,30,'kupanje'),
(120,30,'kupanje'),
(120,25,'šišanje');

insert into stavke(tretmanid,uslugaid,kolicina)
values (1,1,1),
(1,4,1),
(2,1,1),
(3,3,2),
(4,1,1),
(5,1,1);