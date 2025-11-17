<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Utilisateurs</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Liste des Utilisateurs</h1>
    
    <button id="updateBtn">Update</button>
    <div id="loading">Chargement en cours...</div>
    
    <table id="usersTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody id="usersBody">

        </tbody>
    </table>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const updateBtn = document.getElementById('updateBtn');
            const usersBody = document.getElementById('usersBody');
            const loading = document.getElementById('loading');

            function loadUsers() {
                loading.style.display = 'block';
                updateBtn.disabled = true;

                fetch('users.php')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur réseau');
                        }
                        return response.json();
                    })
                    .then(users => {
                        usersBody.innerHTML = '';
                        
                        if (users.error) {
                            usersBody.innerHTML = `<tr><td colspan="4" style="color: red;">Erreur: ${users.error}</td></tr>`;
                        } else if (users.length === 0) {
                            usersBody.innerHTML = '<tr><td colspan="4">Aucun utilisateur trouvé</td></tr>';
                        } else {
                            users.forEach(user => {
                                const row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${user.id || ''}</td>
                                    <td>${user.lastname || ''}</td>
                                    <td>${user.firstname || ''}</td>
                                    <td>${user.email || ''}</td>
                                `;
                                usersBody.appendChild(row);
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Erreur:', error);
                        usersBody.innerHTML = `<tr><td colspan="4" style="color: red;">Erreur lors du chargement des données</td></tr>`;
                    })
                    .finally(() => {
                        loading.style.display = 'none';
                        updateBtn.disabled = false;
                    });
            }

            updateBtn.addEventListener('click', loadUsers);

            loadUsers();
        });
    </script>
</body>
</html>