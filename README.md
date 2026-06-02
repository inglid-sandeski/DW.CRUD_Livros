# 📚 CRUD de Livros

Sistema web desenvolvido para gerenciamento de livros utilizando HTML, CSS, JavaScript, Node.js, Express e MySQL.

## 📋 Descrição

O projeto consiste em um sistema CRUD (Create, Read, Update e Delete) para cadastro e gerenciamento de livros. A aplicação permite cadastrar novos livros, visualizar os registros existentes, editar informações e excluir livros do banco de dados.

## 🚀 Funcionalidades

* Cadastro de livros
* Listagem de livros cadastrados
* Consulta de livro por ID
* Edição de livros
* Exclusão de livros
* Integração com banco de dados MySQL
* Comunicação entre frontend e backend utilizando API REST

## 🛠️ Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* CORS

### Banco de Dados

* MySQL
* mysql2

## 📂 Estrutura do Projeto

```text
CRUD_Livros/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── livrosController.js
│   ├── routes/
│   │   └── livrosRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## 🗄️ Banco de Dados

Criação do banco de dados:

```sql
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(100),
    ano_publicacao INT,
    isbn VARCHAR(20),
    quantidade_disponivel INT DEFAULT 0
);
```

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/CRUD_Livros.git
```

### 2. Acessar a pasta do backend

```bash
cd backend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar a conexão com o MySQL

No arquivo `database.js`, configure:

```javascript
host: 'localhost',
user: 'root',
password: 'sua_senha',
database: 'biblioteca'
```

### 5. Iniciar o servidor

```bash
npm start
```

ou

```bash
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

## 🔗 Rotas da API

### Listar todos os livros

```http
GET /livros
```

### Buscar livro por ID

```http
GET /livros/:id
```

### Cadastrar livro

```http
POST /livros
```

### Atualizar livro

```http
PUT /livros/:id
```

### Excluir livro

```http
DELETE /livros/:id
```

## 📸 Interface

A interface permite:

* Inserir dados do livro;
* Editar registros existentes;
* Excluir registros;
* Visualizar todos os livros cadastrados em uma tabela.

## 🎓 Objetivo Acadêmico

Este projeto foi desenvolvido como atividade prática da disciplina de Desenvolvimento Web do curso de Sistemas de Informação, com o objetivo de aplicar conceitos de:

* Desenvolvimento Frontend;
* Desenvolvimento Backend;
* APIs REST;
* Integração com banco de dados;
* Operações CRUD;
* Arquitetura Cliente-Servidor.

## 👩‍💻 Autora

**Inglid Pablina de Almeida Sandeski**

Curso de Sistemas de Informação – UNEMAT
