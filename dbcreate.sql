CREATE DATABASE incidentes;

USE incidentes;

CREATE TABLE atendentes (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(64)
);

CREATE TABLE clientes (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(64),
  empresa VARCHAR(64)
);

CREATE TABLE incidentes (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  atendente INT(11),
  cliente INT(11),
  descricao VARCHAR(512),
  status VARCHAR(16),
  creation_time TIMESTAMP,
  FOREIGN KEY (atendente) REFERENCES atendentes(id),
  FOREIGN KEY (cliente) REFERENCES clientes(id)
);


INSERT INTO atendentes (nome) VALUES ('Vinicius Giannini');
INSERT INTO atendentes (nome) VALUES ('Felipe Donda');
INSERT INTO atendentes (nome) VALUES ('Steve Gates');
INSERT INTO atendentes (nome) VALUES ('Bill Jobs');

INSERT INTO clientes (nome,empresa) VALUES ('Pedro Amaral','GLP');
INSERT INTO clientes (nome,empresa) VALUES ('Marielle Fernandes','GLP');
INSERT INTO clientes (nome,empresa) VALUES ('Otavio Mesquita','Ambev');
INSERT INTO clientes (nome,empresa) VALUES ('Allan Ribeiro','Unilever');
INSERT INTO clientes (nome,empresa) VALUES ('Marcelo Gavazza','Unilever');


INSERT INTO incidentes (atendente,cliente,descricao,status,creation_time) VALUES (1,1,'Problemas com telefones na sala 7.','Fechado',NOW());
INSERT INTO incidentes (atendente,cliente,descricao,status,creation_time) VALUES (2,2,'Subir novo servidor de arquivos.','Em andamento',NOW());
INSERT INTO incidentes (atendente,cliente,descricao,status,creation_time) VALUES (2,3,'Configurar switch em nova filial.','Aberto',NOW());
