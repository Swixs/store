<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$dir = __DIR__;
$file = $dir . '/users.json';

$input = file_get_contents('php://input');
$data = json_decode($input, true) ?: [];
$action = isset($data['action']) ? $data['action'] : '';

function readUsers($file) {
    if (!file_exists($file)) return [];
    $json = file_get_contents($file);
    $arr = json_decode($json, true);
    return is_array($arr) ? $arr : [];
}

function writeUsers($file, $users) {
    file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

if ($action === 'register') {
    $username = isset($data['username']) ? trim($data['username']) : '';
    $login = isset($data['login']) ? trim($data['login']) : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if ($login === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Login and password required.']);
        exit;
    }
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long.']);
        exit;
    }

    $users = readUsers($file);
    foreach ($users as $u) {
        if (isset($u['login']) && $u['login'] === $login) {
            echo json_encode(['success' => false, 'message' => 'A user with this login already exists.']);
            exit;
        }
    }

    $users[] = ['username' => $username !== '' ? $username : $login, 'login' => $login, 'password' => $password];
    writeUsers($file, $users);
    echo json_encode(['success' => true, 'message' => 'Registration successful!']);
    exit;
}

if ($action === 'login') {
    $login = isset($data['login']) ? trim($data['login']) : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if ($login === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Login and password required.']);
        exit;
    }

    $users = readUsers($file);
    foreach ($users as $u) {
        if (isset($u['login']) && $u['login'] === $login && isset($u['password']) && $u['password'] === $password) {
            $user = ['username' => $u['username'] ?? $u['login'], 'login' => $u['login']];
            echo json_encode(['success' => true, 'user' => $user]);
            exit;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Invalid login or password.']);
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Unknown action.']);
