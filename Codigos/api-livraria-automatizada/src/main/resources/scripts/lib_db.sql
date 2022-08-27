create database Liv_DB;

use Liv_DB;

CREATE TABLE GeneroLivro (
	IdGenero BIGINT auto_increment not null,
	Nome VARCHAR(100) not null,
primary key (IdGenero)
) ENGINE=InnoDB;

CREATE TABLE Livro (
	IdLivro BIGINT auto_increment not null,
	IdGenero BIGINT not null,
	Resumo TEXT null,
	Titulo VARCHAR(255) not null,
	Autor VARCHAR(155) not null,
	Editora VARCHAR(100) not null,
	Ano INT null,
	foreign key (IdGenero) references GeneroLivro(IdGenero),
primary KEY(IdLivro)
) ENGINE=InnoDB;

create table Usuario(
	IdUsuario BIGINT auto_increment not null,
	Nome VARCHAR(255) not null,
	Cpf VARCHAR(14) not null,
	Email VARCHAR(155) not null,
	Login VARCHAR(155) not null,
	Senha VARCHAR(10) not null,
primary key (IdUsuario)
) ENGINE=InnoDB;

create table LocacaoLivro(
	IdLocacao BIGINT auto_increment not null,
	IdUsuario BIGINT not null,
	IdLivro BIGINT not null,
	DataLocado Date not null,
	DataDevolvido Date null,
	foreign key (IdUsuario) references Usuario(IdUsuario),
foreign key (IdLivro) references Livro(IdLivro),
primary key (IdLocacao)
) ENGINE=InnoDB;

INSERT INTO liv_db.generolivro (Nome) values
('Ficção científica'), ('Fantasia'), ('Distopia'), ('Ação e aventura'),
('Horror'), ('Thriller e Suspense'), ('Ficção Policial'), ('Ficção histórica'),
('Romance'), ('Ficção Contemporânea'), ('Realismo mágico'), ('Graphic Novel'),
('Conto'), ('Infantil'), ('Memórias e autobiografia'), ('Biografia'),
('Gastronomia'), ('Arte e Fotografia'), ('Autoajuda'), ('História'),
('Viajem'), ('Crimes Reais'), ('Humor'), ('Religião e Espiritualidade'),
('Humanidades e Ciências Sociais'), ('Tecnologia e Ciência'), ('Humor');


