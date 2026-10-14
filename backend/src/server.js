import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import livrosRoutes from './routes/livrosRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/livros', livrosRoutes);

// O backend também serve o frontend (pasta /frontend). Assim a aplicação inteira
// fica em um único endereço, tanto no seu computador quanto publicada online.
const pastaFrontend = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../frontend'
);
app.use(express.static(pastaFrontend));

//Iniciar o Servidor
// Plataformas de hospedagem informam a porta pela variável PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} (http://localhost:${PORT})`);
});
