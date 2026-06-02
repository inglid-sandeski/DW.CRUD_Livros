import db from '../config/database.js';

export const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM livros ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
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
    res.status(500).json({ erro: error.message });
  }
};

export const criar = async (req, res) => {
  try {
    const { titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel } = req.body;

    if (!titulo || autor == null) {
      return res.status(400).json({ erro: 'Nome e autor são obrigatórios' });
    }

    const [result] = await db.query(
      'INSERT INTO livros (titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel ?? 0]
    );

    res.status(201).json({
      id: result.insertId,
      titulo,
      autor,
      genero,
      ano_publicacao,
      isbn,
      quantidade_disponivel: quantidade_disponivel ?? 0,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel } = req.body;

    const [result] = await db.query(
      `UPDATE livros
       SET titulo = ?,
           autor = ?,
           genero = ?,
           ano_publicacao = ?,
           isbn = ?,
           quantidade_disponivel = ?
       WHERE id = ?`,
      [
        titulo,
        autor,
        genero,
        ano_publicacao,
        isbn,
        quantidade_disponivel,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json({ id: Number(id), titulo, autor, genero, ano_publicacao, isbn, quantidade_disponivel });
  } catch (error) {
    res.status(500).json({ erro: error.message });
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
    res.status(500).json({ erro: error.message });
  }
};