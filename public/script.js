const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const editModal = document.getElementById('editModal');

// 1. CARGAR USUARIOS (READ)
async function fetchUsers() {
    const res = await fetch('/usuarios');
    const users = await res.json();
    userList.innerHTML = '';
    
    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-item';
        div.innerHTML = `
            <div class="user-info">
                <b>${user.nombre}</b>
                <span>${user.email}</span>
            </div>
            <div>
                <button class="btn-edit" onclick="openEditModal(${user.id}, '${user.nombre}', '${user.email}')">Editar</button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">Borrar</button>
            </div>
        `;
        userList.appendChild(div);
    });
}

// 2. CREAR USUARIO (CREATE)
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    await fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
    });

    userForm.reset();
    fetchUsers();
});

// 3. ELIMINAR USUARIO (DELETE)
async function deleteUser(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        await fetch(`/usuarios/${id}`, { method: 'DELETE' });
        fetchUsers();
    }
}

// 4. ACTUALIZAR USUARIO (UPDATE)
function openEditModal(id, nombre, email) {
    document.getElementById('editId').value = id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editEmail').value = email;
    editModal.style.display = 'flex';
}

function closeModal() {
    editModal.style.display = 'none';
}

async function updateUser() {
    const id = document.getElementById('editId').value;
    const nombre = document.getElementById('editNombre').value;
    const email = document.getElementById('editEmail').value;

    await fetch(`/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
    });

    closeModal();
    fetchUsers();
}

// Inicializar
fetchUsers();