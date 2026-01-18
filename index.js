require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión a Base de Datos (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Tabla 'usuarios' verificada/creada correctamente.");
  } catch (err) {
    console.error("Error al crear la tabla:", err);
  }
};

createTable();

// --- OPERACIONES CRUD ---

// 1. LEER (Obtener todos los usuarios)
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. CREAR (Agregar un nuevo usuario)
app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
      [nombre, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. ACTUALIZAR (Modificar datos de un usuario por ID)
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
      [nombre, email, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. ELIMINAR (Borrar un usuario por ID)
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para servir el HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});