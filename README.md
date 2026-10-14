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
* Validação dos dados no servidor, com mensagens de erro exibidas na tela
* Integração com banco de dados MySQL
* Comunicação entre frontend e backend utilizando API REST

## 🛠️ Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js / Bun (o projeto usa o Bun como gerenciador e executor)
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
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── livrosController.js
│   │   ├── routes/
│   │   │   └── livrosRoutes.js
│   │   ├── database.sql
│   │   └── server.js
│   ├── .env.example
│   ├── bun.lock
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

O script `backend/src/database.sql` cria o banco `dsw_crud_livros`, a tabela `livros` e alguns livros de exemplo:

```sql
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
```

Para executar o script (informe a senha do seu MySQL quando for pedida):

```bash
mysql -u root -p < backend/src/database.sql
```

## ⚙️ Instalação

Requisitos: [Bun](https://bun.sh) e MySQL instalados.

### 1. Clonar o repositório

```bash
git clone https://github.com/inglid-sandeski/DW.CRUD_Livros.git
```

### 2. Criar o banco de dados

Execute o script SQL da seção anterior.

### 3. Acessar a pasta do backend e instalar as dependências

```bash
cd DW.CRUD_Livros/backend
bun install
```

### 4. Configurar a conexão com o MySQL

Copie o arquivo de exemplo e preencha com os seus dados:

```bash
cp .env.example .env
```

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=dsw_crud_livros
```

O arquivo `.env` não é enviado ao GitHub (está no `.gitignore`). Nunca coloque senhas diretamente no código.

### 5. Iniciar o servidor

```bash
bun start
```

Servidor disponível em:

```text
http://localhost:3000
```

> Quer usar Node.js em vez do Bun (Node 20.6 ou mais novo)? Rode `npm install` e depois `node --env-file=.env src/server.js`.

### 6. Abrir o frontend

Abra o arquivo `frontend/index.html` no navegador. Ele conversa com a API em `http://localhost:3000`, então o servidor precisa estar rodando.

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

### Campos e respostas de erro

Corpo (JSON) de `POST` e `PUT`: `titulo`, `autor`, `genero`, `isbn` (textos obrigatórios), `ano_publicacao` (inteiro) e `quantidade_disponivel` (inteiro maior ou igual a 0; no `POST` o padrão é 0).

* `400`: dados inválidos ou faltando
* `404`: livro não encontrado
* `409`: já existe um livro com o mesmo ISBN
* `500`: erro interno do servidor

As respostas de erro têm o formato `{ "erro": "mensagem" }`.

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
