CREATE DATABASE IF NOT EXISTS dsw_crud_livros;
USE dsw_crud_livros;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    ano_publicacao INT NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    quantidade_disponivel INT NOT NULL DEFAULT 0
);

INSERT INTO livros
(titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel)
VALUES
('Dom Casmurro', 'Machado de Assis', 'Romance', 1899, '9788535914849', 10),
('O Cortiço', 'Aluísio Azevedo', 'Romance', 1890, '9788572326971', 8),
('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Romance', 1881, '9788535910667', 12),
('Capitães da Areia', 'Jorge Amado', 'Romance', 1937, '9788535920505', 15),
('A Hora da Estrela', 'Clarice Lispector', 'Romance', 1977, '9788532505736', 6);