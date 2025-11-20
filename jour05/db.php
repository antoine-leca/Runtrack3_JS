<?php 
    class Database {
        protected $pdo;

        public function connect($host = 'localhost', $dbname = 'users', $username = 'root', $password = 'root') {
            try {
                $this->pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return true;
            } catch(PDOException $e) {
                echo "Erreur de connexion : " . $e->getMessage();
                return false;
            }
        }
    }

    class User extends Database {
        public int $user_id;
        public string $firstname;
        public string $lastname;
        public string $email;
        public string $password;
        public string $password_hashed;

        public function __construct() {
            $this->connect();
        }

        public function createUser($firstname, $lastname, $email, $password) {
            $password_hashed = password_hash($password, PASSWORD_BCRYPT);
            
            $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)";
            $req = $this->pdo->prepare($sql);

            return $req->execute([
                ':firstname' => $firstname,
                ':lastname' => $lastname,
                ':email' => $email,
                ':password' => $password_hashed
            ]);
        }

        public function getUser($user_id) {
            $sql = "SELECT * FROM users WHERE id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$user_id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function getAllUsers() {
            $sql = "SELECT * FROM users";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function loginUser($email, $password) {
            $sql = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && password_verify($password, $user['password'])) {
                return $user;
            }
            return false;
        }
    }
?>