<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_POST["btnDeco"])) {
        session_destroy();
        session_unset();
        header("Location: connexion.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accueil</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <?php if (!isset($_SESSION['user_id'])): ?>
            <a href="connexion.php">Connexion</a>
            <p> ou </p>
            <a href="inscription.php">Inscription</a>
        <?php else: ?>
            <p>Bonjour <?= htmlspecialchars($_SESSION['firstname']) ?></p>
            <form action="" method="POST">
                <button name="btnDeco" class="btn btn-neutral">Se déconnecter</button>
            </form>
        <?php endif; ?>
    </body>
</html>