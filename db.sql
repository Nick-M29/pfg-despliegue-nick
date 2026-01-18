-- 1. Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,        
    nombre VARCHAR(100) NOT NULL,  
    email VARCHAR(100) UNIQUE NOT NULL,
);

-- 2. Insertar datos de prueba (opcional)
INSERT INTO usuarios (nombre, email) VALUES 
('Usuario Inicial', 'admin@ejemplo.com'),
('Prueba Render', 'test@render.com');