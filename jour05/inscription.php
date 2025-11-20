<?php
    session_start();
    
    if (isset($_SESSION["logged_in"]) == true) {
        header("Location: index.php");
        exit();
    }
    require_once "db.php";
    
    $message = "";
    $messageType = "";

    // form
    if ($_POST) {
        $nom = $_POST['nom'] ?? '';
        $prenom = $_POST['prenom'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $password_confirm = $_POST['password_confirm'] ?? '';

        // vérifications diverses
        if (empty($nom) || empty($prenom) || empty($email) || empty($password)) {
            $message = "Tous les champs sont obligatoires.";
            $messageType = "error";
        } elseif ($password !== $password_confirm) {
            $message = "Les mots de passe ne correspondent pas.";
            $messageType = "error";
        } elseif (strlen($password) < 8) {
            $message = "Le mot de passe doit contenir au moins 6 caractères.";
            $messageType = "error";
        } else {
            // Appel de la class user
            $user = new User();
            // et de sa méthode createUser
            if ($user->createUser($prenom, $nom, $email, $password)) {
                $message = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
                $messageType = "success";
            } else {
                $message = "Erreur lors de l'inscription. Cet email existe peut-être déjà.";
                $messageType = "error";
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script>
        <?php if ($messageType === 'success'): ?>
        // Redirection vers la page de connexion après 4 secondes
        let countdown = 4;
        
        function updateCountdown() {
            const alertDiv = document.querySelector('.alert-success');
            if (alertDiv) {
                alertDiv.innerHTML = `Inscription réussie ! Redirection vers la connexion dans ${countdown} seconde${countdown > 1 ? 's' : ''}...`;
            }
            
            countdown--;
            
            if (countdown < 0) {
                window.location.href = 'connexion.php';
            }
        }
        
        // Démarrer le compte à rebours quand la page est chargée
        document.addEventListener('DOMContentLoaded', function() {
            updateCountdown();
            setInterval(updateCountdown, 1000);
        });
        <?php endif; ?>

        // Validation en temps réel
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            const nom = document.querySelector('input[name="nom"]');
            const prenom = document.querySelector('input[name="prenom"]');
            const email = document.querySelector('input[name="email"]');
            const password = document.querySelector('input[name="password"]');
            const passwordConfirm = document.querySelector('input[name="password_confirm"]');
            const submitBtn = document.querySelector('button[type="submit"]');

            // Fonction pour afficher les erreurs
            function showError(input, message) {
                const formControl = input.closest('.form-control');
                let errorDiv = formControl.querySelector('.error-message');
                
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message text-error text-sm mt-1';
                    formControl.appendChild(errorDiv);
                }
                
                errorDiv.textContent = message;
                input.classList.add('input-error');
            }

            // Fonction pour retirer les erreurs
            function removeError(input) {
                const formControl = input.closest('.form-control');
                const errorDiv = formControl.querySelector('.error-message');
                
                if (errorDiv) {
                    errorDiv.remove();
                }
                
                input.classList.remove('input-error');
            }

            // Validation du nom
            nom.addEventListener('input', function() {
                if (this.value.trim().length < 2) {
                    showError(this, 'Le nom doit contenir au moins 2 caractères');
                } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(this.value)) {
                    showError(this, 'Le nom ne doit contenir que des lettres');
                } else {
                    removeError(this);
                }
            });

            // Validation du prénom
            prenom.addEventListener('input', function() {
                if (this.value.trim().length < 2) {
                    showError(this, 'Le prénom doit contenir au moins 2 caractères');
                } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(this.value)) {
                    showError(this, 'Le prénom ne doit contenir que des lettres');
                } else {
                    removeError(this);
                }
            });

            // Validation de l'email
            email.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    showError(this, 'Email invalide');
                } else {
                    removeError(this);
                }
            });

            // Validation du mot de passe
            password.addEventListener('input', function() {
                if (this.value.length < 8) {
                    showError(this, 'Le mot de passe doit contenir au moins 8 caractères');
                } else if (!/(?=.*[a-z])/.test(this.value)) {
                    showError(this, 'Le mot de passe doit contenir au moins une minuscule');
                } else if (!/(?=.*[A-Z])/.test(this.value)) {
                    showError(this, 'Le mot de passe doit contenir au moins une majuscule');
                } else if (!/(?=.*\d)/.test(this.value)) {
                    showError(this, 'Le mot de passe doit contenir au moins un chiffre');
                } else {
                    removeError(this);
                }
                
                // Vérifier aussi la confirmation si elle est déjà remplie
                if (passwordConfirm.value) {
                    passwordConfirm.dispatchEvent(new Event('input'));
                }
            });

            // Validation de la confirmation du mot de passe
            passwordConfirm.addEventListener('input', function() {
                if (this.value !== password.value) {
                    showError(this, 'Les mots de passe ne correspondent pas');
                } else if (this.value.length === 0) {
                    showError(this, 'Veuillez confirmer votre mot de passe');
                } else {
                    removeError(this);
                }
            });

            // Validation à la soumission
            form.addEventListener('submit', function(e) {
                let hasError = false;

                // Vérifier tous les champs
                if (nom.value.trim() === '') {
                    showError(nom, 'Le nom est obligatoire');
                    hasError = true;
                }

                if (prenom.value.trim() === '') {
                    showError(prenom, 'Le prénom est obligatoire');
                    hasError = true;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    showError(email, 'Email invalide');
                    hasError = true;
                }

                if (password.value.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
                    showError(password, 'Mot de passe invalide');
                    hasError = true;
                }

                if (passwordConfirm.value !== password.value) {
                    showError(passwordConfirm, 'Les mots de passe ne correspondent pas');
                    hasError = true;
                }

                // Empêcher la soumission si erreurs
                if (hasError) {
                    e.preventDefault();
                    
                    // Scroll vers la première erreur
                    const firstError = document.querySelector('.input-error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                }
            });
        });
    </script>
</head>
<body>
    <div class="min-h-screen bg-base-200 flex items-center justify-center">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title text-center text-2xl font-bold mb-6">Inscription</h2>
                
                <form method="POST" class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nom</span>
                        </label>
                        <input type="text" name="nom" class="input input-bordered w-full" placeholder="Votre nom" required
                               value="<?= htmlspecialchars($_POST['nom'] ?? '') ?>">
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Prénom</span>
                        </label>
                        <input type="text" name="prenom" class="input input-bordered w-full" placeholder="Votre prénom" required
                               value="<?= htmlspecialchars($_POST['prenom'] ?? '') ?>">
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="email" name="email" class="input input-bordered w-full" placeholder="votre@email.com" required
                               value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Mot de passe</span>
                        </label>
                        <input type="password" name="password" class="input input-bordered w-full" placeholder="Votre mot de passe" required>
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Confirmer le mot de passe</span>
                        </label>
                        <input type="password" name="password_confirm" class="input input-bordered w-full" placeholder="Confirmez votre mot de passe" required>
                    </div>
                    <?php if ($message): ?>
                    <div class="alert <?= $messageType === 'success' ? 'alert-success' : 'alert-error' ?> mb-4">
                        <?= htmlspecialchars($message) ?>
                    </div>
                    <?php endif; ?>
                    
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-neutral w-full">S'inscrire</button>
                    </div>

                    <div class="text-center mt-4">
                        <p class="text-sm">Déjà inscrit ? 
                            <a href="connexion.php" class="link link-neutral">Se connecter</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>