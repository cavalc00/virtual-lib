CREATE TABLE Livro (
	Id BIGINT auto_increment not null,
	Titulo VARCHAR(255) not null,
	Autor VARCHAR(255) not null,
	Editora VARCHAR(255) not null,
	Ano INT null,
	primary KEY(Id)
) ENGINE=InnoDB;

