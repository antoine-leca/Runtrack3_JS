<?php
    session_start();
    
    if (isset($_SESSION["logged_in"]) == true) {
        header("Location: index.php");
        exit();
    }
    require_once "db.php";
    
    $message = "";
    $messageType = "";

    // Redirection si déjà connecté
    if (isset($_SESSION['user_id'])) {
        header('Location: index.php');
        exit();
    }

    // Traitement du formulaire
    if ($_POST) {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        // Validation
        if (empty($email) || empty($password)) {
            $message = "Tous les champs sont obligatoires.";
            $messageType = "error";
        } else {
            // Vérification de l'utilisateur
            $user = new User();
            $userData = $user->loginUser($email, $password);

            var_dump($userData);
            var_dump($_SESSION);
            
            if ($userData) {
                // Création des variables de session
                $_SESSION['user_id'] = $userData['id'];
                $_SESSION['firstname'] = $userData['firstname'];
                $_SESSION['lastname'] = $userData['lastname'];
                $_SESSION['email'] = $userData['email'];
                $_SESSION['logged_in'] = true;
                
                // Redirection vers le dashboard
                // header('Location: index.php');
                exit();
            } else {
                $message = "Email ou mot de passe incorrect.";
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
    <title>Connexion</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="min-h-screen bg-base-200 flex items-center justify-center">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title text-center text-2xl font-bold mb-6">Connexion</h2>
                
                <form method="POST" class="space-y-4">
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

                    <?php if ($message): ?>
                    <div class="alert <?= $messageType === 'success' ? 'alert-success' : 'alert-error' ?> mb-4">
                        <?= htmlspecialchars($message) ?>
                    </div>
                    <?php endif; ?>

                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-neutral w-full">Se connecter</button>
                    </div>

                    <div class="text-center mt-4">
                        <p class="text-sm">Pas encore inscrit ? 
                            <a href="inscription.php" class="link link-neutral">S'inscrire</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>