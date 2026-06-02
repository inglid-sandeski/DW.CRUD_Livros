const API = 'http://localhost:3000/livros';

const form = document.getElementById('form-livro');
const inputId = document.getElementById('livro-id');
const inputTitulo = document.getElementById('titulo');
const inputAutor = document.getElementById('autor');
const inputGenero = document.getElementById('genero');
const inputAnoPublicacao = document.getElementById('ano_publicacao');
const inputIsbn = document.getElementById('isbn');
const inputQuantidadeDisponivel = document.getElementById('quantidade_disponivel');
const btnCancelar = document.getElementById('btn-cancelar');
const tbody = document.querySelector('#tabela-livros tbody');

function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function criarBotao(rotulo, classe, id) {
  const botao = document.createElement('button');
  botao.textContent = rotulo;
  botao.className = classe;
  botao.dataset.id = id;
  return botao;
}

async function listarLivros() {
  const resposta = await fetch(API);
  const livros = await resposta.json();

  tbody.replaceChildren();

  livros.forEach((p) => {
    const tr = document.createElement('tr');

    tr.append(
      criarCelula(p.id),
      criarCelula(p.titulo),
      criarCelula(p.autor),
      criarCelula(p.genero),
      criarCelula(p.ano_publicacao),
      criarCelula(p.isbn),
      criarCelula(p.quantidade_disponivel)
    );

    const tdAcoes = document.createElement('td');

    tdAcoes.append(
      criarBotao('Editar', 'btn-editar', p.id),
      criarBotao('Excluir', 'btn-excluir', p.id)
    );

    tr.append(tdAcoes);
    tbody.append(tr);
  });
}

async function salvarLivro(evento) {
  evento.preventDefault();

  const dados = {
    titulo: inputTitulo.value,
    autor: inputAutor.value,
    genero: inputGenero.value,
    ano_publicacao: parseInt(inputAnoPublicacao.value, 10),
    isbn: inputIsbn.value,
    quantidade_disponivel: parseInt(inputQuantidadeDisponivel.value, 10),
  };

  const id = inputId.value;

  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
  }

  resetarFormulario();
  listarLivros();
}

async function editarLivro(id) {
  const resposta = await fetch(`${API}/${id}`);
  const livro = await resposta.json();

  inputId.value = livro.id;
  inputTitulo.value = livro.titulo;
  inputAutor.value = livro.autor;
  inputGenero.value = livro.genero;
  inputAnoPublicacao.value = livro.ano_publicacao;
  inputIsbn.value = livro.isbn;
  inputQuantidadeDisponivel.value = livro.quantidade_disponivel;

  btnCancelar.hidden = false;
}

async function excluirLivro(id) {
  if (!confirm('Deseja excluir este livro?')) return;

  await fetch(`${API}/${id}`, { method: 'DELETE' });
  listarLivros();
}

function resetarFormulario() {
  form.reset();

  inputId.value = '';
  inputTitulo.value = '';
  inputAutor.value = '';
  inputGenero.value = '';
  inputAnoPublicacao.value = '';
  inputIsbn.value = '';
  inputQuantidadeDisponivel.value = '';

  btnCancelar.hidden = true;
}

form.addEventListener('submit', salvarLivro);
btnCancelar.addEventListener('click', resetarFormulario);

tbody.addEventListener('click', (evento) => {
  const id = evento.target.dataset.id;
  if (!id) return;

  if (evento.target.classList.contains('btn-editar')) {
    editarLivro(id);
  } else if (evento.target.classList.contains('btn-excluir')) {
    excluirLivro(id);
  }
});

listarLivros();