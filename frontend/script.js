// Servido pelo backend (local ou online): usa o mesmo endereço da página.
// Aberto direto do disco (file://): usa o backend local na porta 3000.
const API = location.protocol === 'file:' ? 'http://localhost:3000/livros' : '/livros';

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
const mensagem = document.getElementById('mensagem');

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.hidden = false;
}

function limparMensagem() {
  mensagem.textContent = '';
  mensagem.hidden = true;
}

// Lê a mensagem de erro enviada pela API; se não houver, usa um texto padrão.
async function lerErro(resposta) {
  try {
    const corpo = await resposta.json();
    if (corpo && corpo.erro) return corpo.erro;
  } catch {
    // resposta sem JSON: usa a mensagem padrão abaixo
  }
  return `Erro ao falar com o servidor (código ${resposta.status})`;
}

const MENSAGEM_SERVIDOR_FORA =
  'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';

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
  try {
    const resposta = await fetch(API);

    if (!resposta.ok) {
      mostrarMensagem(await lerErro(resposta));
      return;
    }

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
  } catch {
    mostrarMensagem(MENSAGEM_SERVIDOR_FORA);
  }
}

async function salvarLivro(evento) {
  evento.preventDefault();
  limparMensagem();

  const dados = {
    titulo: inputTitulo.value,
    autor: inputAutor.value,
    genero: inputGenero.value,
    ano_publicacao: parseInt(inputAnoPublicacao.value, 10),
    isbn: inputIsbn.value,
    quantidade_disponivel: parseInt(inputQuantidadeDisponivel.value, 10),
  };

  const id = inputId.value;
  const url = id ? `${API}/${id}` : API;
  const metodo = id ? 'PUT' : 'POST';

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      // Mantém o que a pessoa digitou para ela poder corrigir e tentar de novo
      mostrarMensagem(await lerErro(resposta));
      return;
    }
  } catch {
    mostrarMensagem(MENSAGEM_SERVIDOR_FORA);
    return;
  }

  resetarFormulario();
  listarLivros();
}

async function editarLivro(id) {
  limparMensagem();

  try {
    const resposta = await fetch(`${API}/${id}`);

    if (!resposta.ok) {
      mostrarMensagem(await lerErro(resposta));
      return;
    }

    const livro = await resposta.json();

    inputId.value = livro.id;
    inputTitulo.value = livro.titulo;
    inputAutor.value = livro.autor;
    inputGenero.value = livro.genero;
    inputAnoPublicacao.value = livro.ano_publicacao;
    inputIsbn.value = livro.isbn;
    inputQuantidadeDisponivel.value = livro.quantidade_disponivel;

    btnCancelar.hidden = false;
  } catch {
    mostrarMensagem(MENSAGEM_SERVIDOR_FORA);
  }
}

async function excluirLivro(id) {
  if (!confirm('Deseja excluir este livro?')) return;

  limparMensagem();

  try {
    const resposta = await fetch(`${API}/${id}`, { method: 'DELETE' });

    if (!resposta.ok) {
      mostrarMensagem(await lerErro(resposta));
      return;
    }
  } catch {
    mostrarMensagem(MENSAGEM_SERVIDOR_FORA);
    return;
  }

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

function cancelarEdicao() {
  limparMensagem();
  resetarFormulario();
}

form.addEventListener('submit', salvarLivro);
btnCancelar.addEventListener('click', cancelarEdicao);

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
