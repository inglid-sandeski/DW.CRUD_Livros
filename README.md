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

### 6. Abrir a aplicação

Com o servidor rodando, acesse `http://localhost:3000` no navegador: o backend também serve a pasta `frontend/`, então a tela e a API ficam no mesmo endereço.

(Abrir o arquivo `frontend/index.html` direto do disco também funciona, desde que o servidor esteja rodando na porta 3000.)

## ☁️ Publicação online (exemplo: Railway)

Como o backend serve o frontend, basta publicar um único serviço mais um banco MySQL.

1. Crie uma conta em [railway.com](https://railway.com) e um novo projeto a partir do repositório do GitHub. Defina a pasta raiz do serviço como `backend`.
2. No mesmo projeto, adicione um banco **MySQL** (botão **+ New**).
3. No serviço do backend, crie as variáveis de ambiente apontando para o banco (use o nome que o serviço MySQL tem no seu projeto):

   ```text
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   ```

   A porta (`PORT`) é definida pela própria plataforma.
4. Crie a tabela no banco da nuvem: execute o conteúdo de `backend/src/database.sql` **a partir de `CREATE TABLE`**, sem as duas primeiras linhas (`CREATE DATABASE` e `USE`), no banco que a plataforma criou. Para conectar de fora, ative o acesso público do serviço MySQL (**Settings → Networking**) e use a string `MYSQL_PUBLIC_URL`.
5. Gere um domínio público para o serviço do backend (**Settings → Networking**) e abra o endereço no navegador.

Atenção: os planos gratuitos de hospedagem têm limites e podem mudar; confira os preços na documentação da plataforma antes de começar.

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
