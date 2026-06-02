import express from 'express';
import cors from 'cors';
import livrosRoutes from './routes/livrosRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/livros', livrosRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do CRUD de Livros rodando' });
});

//Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});