import db from '../config/database.js';

// Limites iguais aos das colunas da tabela (veja src/database.sql)
const LIMITES_TEXTO = {
  titulo: 255,
  autor: 150,
  genero: 100,
  isbn: 20,
};

const NOMES_CAMPOS = {
  titulo: 'Título',
  autor: 'Autor',
  genero: 'Gênero',
  isbn: 'ISBN',
};

// Valida os dados de um livro. Devolve { dados } quando está tudo certo
// ou { erro } com a mensagem para o usuário.
// Se quantidadePadrao for informada, ela é usada quando a quantidade não vier no corpo.
function validarLivro(corpo, quantidadePadrao) {
  const entrada = corpo ?? {};
  const erros = [];
  const dados = {};

  for (const [campo, limite] of Object.entries(LIMITES_TEXTO)) {
    const valor = entrada[campo];

    if (typeof valor !== 'string' || valor.trim() === '') {
      erros.push(`${NOMES_CAMPOS[campo]} é obrigatório`);
    } else if (valor.trim().length > limite) {
      erros.push(`${NOMES_CAMPOS[campo]} deve ter no máximo ${limite} caracteres`);
    } else {
      dados[campo] = valor.trim();
    }
  }

  const anoMaximo = new Date().getFullYear() + 1;
  const ano = entrada.ano_publicacao;
  if (!Number.isInteger(ano) || ano < 1 || ano > anoMaximo) {
    erros.push(`Ano de publicação deve ser um número inteiro entre 1 e ${anoMaximo}`);
  } else {
    dados.ano_publicacao = ano;
  }

  let quantidade = entrada.quantidade_disponivel;
  if ((quantidade === undefined || quantidade === null) && quantidadePadrao !== undefined) {
    quantidade = quantidadePadrao;
  }
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    erros.push('Quantidade disponível deve ser um número inteiro maior ou igual a 0');
  } else {
    dados.quantidade_disponivel = quantidade;
  }

  if (erros.length > 0) {
    return { erro: erros.join('; ') };
  }

  return { dados };
}

// Responde ao cliente sem expor detalhes internos do banco.
// O detalhe técnico fica só no log do servidor.
function tratarErro(res, error) {
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ erro: 'Já existe um livro cadastrado com este ISBN' });
  }

  console.error(error);
  res.status(500).json({ erro: 'Erro interno do servidor' });
}

export const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM livros ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    tratarErro(res, error);
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM livros WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    tratarErro(res, error);
  }
};

export const criar = async (req, res) => {
  try {
    const { dados, erro } = validarLivro(req.body, 0);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const { titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel } = dados;

    const [result] = await db.query(
      'INSERT INTO livros (titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel]
    );

    res.status(201).json({ id: result.insertId, ...dados });
  } catch (error) {
    tratarErro(res, error);
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { dados, erro } = validarLivro(req.body);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const { titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel } = dados;

    const [result] = await db.query(
      `UPDATE livros
       SET titulo = ?,
           autor = ?,
           genero = ?,
           ano_publicacao = ?,
           isbn = ?,
           quantidade_disponivel = ?
       WHERE id = ?`,
      [titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json({ id: Number(id), ...dados });
  } catch (error) {
    tratarErro(res, error);
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM livros WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (error) {
    tratarErro(res, error);
  }
};
