Documentación del Proyecto: CRUD de Gestión de Usuarios
Nombre: Nickolas Magallanes Mauricio
Asignatura: Despliegue de Aplicaciones Web
Curso: 2WET
1. Descripción General
Este proyecto consiste en una aplicación web Full Stack que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre una base de datos de usuarios. La aplicación está diseñada para demostrar habilidades en el manejo de bases de datos relacionales, desarrollo de APIs con Node.js y despliegue en entornos de nube (Cloud).
2. Tecnologías Utilizadas
•	Frontend: HTML5, CSS3 (Flexbox/Modales) y JavaScript Vanilla (Fetch API).
•	Backend: Node.js con el framework Express.
•	Base de Datos: PostgreSQL (alojada en Render).
•	Despliegue: Render (Web Service + PostgreSQL Instance).
•	Control de Versiones: Git y GitHub.
3. Arquitectura del Sistema
La aplicación sigue un modelo de arquitectura cliente-servidor:
1.	Capa de Presentación: Interfaz de usuario que interactúa con el usuario final.
2.	Capa de Lógica (API): Servidor Express que gestiona las peticiones HTTP y la lógica de negocio.
3.	Capa de Datos: Base de datos PostgreSQL que persiste la información de forma segura.
________________________________________
4. Instalación y Configuración Local
Para ejecutar este proyecto localmente, sigue estos pasos:
1.	Clonar el repositorio:
Bash
git clone https://github.com/Nick-M29/pfg-despliegue-nick.git
2.	Instalar dependencias:
Bash
npm install
3.	Configurar variables de entorno:
Crear un archivo .env con la siguiente estructura:
Fragmento de código
DATABASE_URL=tu_url_de_postgresql
PORT=3000
4.	Ejecutar:
Bash
node index.js
________________________________________
5. Endpoints de la API
La API expone las siguientes rutas:
Método	Ruta	Descripción
GET	/usuarios	Obtiene la lista de todos los usuarios.
POST	/usuarios	Crea un nuevo usuario.
PUT	/usuarios/:id	Actualiza los datos de un usuario existente.
DELETE	/usuarios/:id	Elimina un usuario de la base de datos.
________________________________________
6. Proceso de Despliegue
El despliegue se realizó en la plataforma Render:
1.	Base de Datos: Se creó una instancia de PostgreSQL en la región de Virginia.
2.	Web Service: Se conectó el repositorio de GitHub.
3.	Automatización: El servidor incluye una función de auto-creación de tablas (CREATE TABLE IF NOT EXISTS), lo que facilita la migración y puesta en marcha automática al detectar la conexión.
4.	Seguridad: Se utilizaron variables de entorno para proteger las credenciales de la base de datos, evitando subirlas al control de versiones.
________________________________________
7. Conclusiones
Este proyecto demuestra la integración exitosa de un entorno de desarrollo local con un entorno de producción en la nube, asegurando la escalabilidad y disponibilidad de la aplicación mediante el uso de herramientas modernas de desarrollo de software.
El enlace para ver el proyecto desplegado es el siguiente:
https://pfg-despliegue-nick.onrender.com
