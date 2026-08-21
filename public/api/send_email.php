<?php
// send_email.php - Nosy Be Secret Islands Tours
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

function debugLog($message) { error_log("[JACTOUR] " . $message); }

// Les valeurs saisies par le visiteur (nom, sujet...) finissent dans des
// en-têtes email construits à la main — un retour à la ligne dans l'un
// d'eux permettrait d'injecter des en-têtes arbitraires (Bcc, etc.).
function cleanHeaderField($value) {
    return trim(str_replace(["\r", "\n"], '', $value));
}

function loadEnv($path) {
    if (!file_exists($path)) return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim(trim($value), '"');
        if (!array_key_exists($name, $_ENV)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
    return true;
}

loadEnv(__DIR__ . '/.env');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$formType       = isset($data['form_type']) ? trim($data['form_type']) : 'contact';
$smtpHost       = getenv('MAIL_HOST');
$smtpPort       = getenv('MAIL_PORT');
$smtpUsername   = getenv('MAIL_USERNAME');
$smtpPassword   = getenv('MAIL_PASSWORD');
$smtpEncryption = getenv('MAIL_ENCRYPTION');
$fromAddress    = getenv('MAIL_FROM_ADDRESS');
$fromName       = getenv('MAIL_FROM_NAME');
$toAddress      = getenv('MAIL_ADMIN_EMAIL');

// Honeypot anti-spam: a hidden field real visitors never fill in.
if (!empty($data['website'])) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès !']);
    exit;
}

// Build HTML email template
function emailHtml($title, $content, $replyEmail = '') {
    $replyBtn = $replyEmail
        ? "<div style='text-align:center;margin-top:22px;'><a href='mailto:" . htmlspecialchars($replyEmail) . "' style='display:inline-block;background:linear-gradient(135deg,#04BBFF,#0594D0);color:#fff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;'>&#8617;&#65039; Répondre au client</a></div>"
        : '';
    return "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>
body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f4;margin:0;padding:0;color:#1C1C1F}
.wrap{max-width:600px;margin:20px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,.12)}
.head{background:linear-gradient(135deg,#04BBFF,#0594D0);color:#fff;padding:28px 24px;text-align:center}
.head h1{margin:0;font-size:22px;font-weight:700}
.head p{margin:6px 0 0;font-size:13px;opacity:.9}
.body{padding:28px}
.info{background:#f8f9fa;border-left:4px solid #04BBFF;padding:18px 20px;border-radius:6px;margin-bottom:16px}
.row{margin-bottom:12px;line-height:1.5}
.row:last-child{margin-bottom:0}
.lbl{font-weight:600;color:#0594D0;display:inline-block;min-width:120px}
.msg-box{background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:18px;margin-top:18px}
.msg-box .lbl{display:block;margin-bottom:8px;font-size:15px}
.msg-content{line-height:1.8;color:#1C1C1F}
.foot{background:#f8f9fa;text-align:center;padding:18px;color:#666;font-size:12px;border-top:1px solid #e0e0e0}
</style></head><body>
<div class='wrap'>
  <div class='head'><h1>{$title}</h1><p>Nosy Be Secret Islands Tours — Nosy Be, Madagascar</p></div>
  <div class='body'>
    <div class='info'>{$content}</div>
    {$replyBtn}
  </div>
  <div class='foot'>
    <p><strong>Nosy Be Secret Islands Tours &mdash; Nosy Be, Madagascar</strong></p>
    <p>&#128222; 034 12 148 83 &nbsp;|&nbsp; &#128231; ralambojacquinette@gmail.com</p>
  </div>
</div>
</body></html>";
}

function row($label, $value) {
    return "<div class='row'><span class='lbl'>" . $label . "</span><span>" . htmlspecialchars($value) . "</span></div>";
}

$emailSubject = '';
$emailBody    = '';
$replyTo      = $fromAddress;

switch ($formType) {

    // ── Formulaire de contact général ──
    case 'contact':
        $name    = cleanHeaderField($data['name'] ?? '');
        $email   = cleanHeaderField($data['email'] ?? '');
        $phone   = trim($data['phone'] ?? '');
        $subject = cleanHeaderField($data['subject'] ?? '');
        $message = trim($data['message'] ?? '');

        if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
            exit;
        }

        $replyTo      = $email;
        $emailSubject = "Nouveau contact — " . ($subject ?: 'Message');
        $content  = row('&#128100; Nom :', $name);
        $content .= row('&#128231; Email :', $email);
        if ($phone) $content .= row('&#128222; Téléphone :', $phone);
        if ($subject) $content .= row('&#128203; Sujet :', $subject);
        $content .= row('&#128336; Date :', date('d/m/Y à H:i'));
        $content .= "<div class='msg-box'><span class='lbl'>&#128172; Message :</span><div class='msg-content'>" . nl2br(htmlspecialchars($message)) . "</div></div>";
        $emailBody = emailHtml('&#128231; Nouveau Message de Contact', $content, $email);
        break;

    // ── Réservation excursion ──
    case 'booking_excursion':
        $name      = cleanHeaderField($data['name'] ?? '');
        $email     = cleanHeaderField($data['email'] ?? '');
        $phone     = trim($data['phone'] ?? '');
        $excursion = cleanHeaderField($data['excursion'] ?? '');
        $date      = trim($data['date'] ?? '');
        $persons   = trim($data['persons'] ?? '');
        $message   = trim($data['message'] ?? '');

        if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Nom et email valide requis.']);
            exit;
        }

        $replyTo      = $email;
        $emailSubject = "Réservation excursion — " . $excursion;
        $content  = row('&#128100; Nom :', $name);
        $content .= row('&#128231; Email :', $email);
        if ($phone) $content .= row('&#128222; Téléphone :', $phone);
        $content .= row('&#127754; Excursion :', $excursion);
        if ($date) $content .= row('&#128197; Date souhaitée :', $date);
        if ($persons) $content .= row('&#128101; Personnes :', $persons);
        $content .= row('&#128336; Date demande :', date('d/m/Y à H:i'));
        if ($message) $content .= "<div class='msg-box'><span class='lbl'>&#128172; Message :</span><div class='msg-content'>" . nl2br(htmlspecialchars($message)) . "</div></div>";
        $emailBody = emailHtml('&#127754; Nouvelle Réservation Excursion', $content, $email);
        break;

    // ── Inscription newsletter ──
    case 'newsletter':
        $email = cleanHeaderField($data['email'] ?? '');

        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Email invalide.']);
            exit;
        }

        $replyTo      = $email;
        $emailSubject = "Nouvelle inscription newsletter";
        $content  = row('&#128231; Email :', $email);
        $content .= row('&#128336; Date :', date('d/m/Y à H:i'));
        $emailBody = emailHtml('&#128236; Nouvelle Inscription Newsletter', $content, $email);
        break;

    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Type de formulaire inconnu.']);
        exit;
}

// Encode un en-tête (Subject, nom d'affichage) en RFC 2047 s'il contient des
// caractères non-ASCII (accents, tirets typographiques...) — un en-tête brut
// en UTF-8 est mal interprété par certains clients et pénalisé par les
// filtres anti-spam.
function encodeHeaderValue($value) {
    if (preg_match('/[^\x20-\x7E]/', $value)) {
        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }
    return $value;
}

// ── Envoi SMTP ──
function sendSMTPEmail($host, $port, $username, $password, $encryption, $from, $fromName, $to, $subject, $body, $replyTo = null) {
    try {
        $context = stream_context_create([
            'ssl' => ['verify_peer' => true, 'verify_peer_name' => true]
        ]);

        $smtp = ($encryption === 'ssl')
            ? @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context)
            : @stream_socket_client("{$host}:{$port}", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);

        if (!$smtp) { debugLog("Connexion échouée: $errstr ($errno)"); return false; }

        $getResp = function() use ($smtp) {
            $r = '';
            while ($l = fgets($smtp, 515)) { $r .= $l; if (isset($l[3]) && $l[3] === ' ') break; }
            return $r;
        };

        $getResp(); // Welcome banner
        fputs($smtp, "EHLO {$host}\r\n"); $getResp();

        $auth = base64_encode("\0{$username}\0{$password}");
        fputs($smtp, "AUTH PLAIN {$auth}\r\n");
        $resp = $getResp();
        if (strpos($resp, '235') === false) { debugLog("Auth échouée: $resp"); fclose($smtp); return false; }

        fputs($smtp, "MAIL FROM: <{$from}>\r\n"); $getResp();
        fputs($smtp, "RCPT TO: <{$to}>\r\n"); $getResp();
        fputs($smtp, "DATA\r\n"); $getResp();

        $headers  = "From: " . encodeHeaderValue($fromName) . " <{$from}>\r\n";
        $headers .= "Reply-To: " . ($replyTo ?: $from) . "\r\n";
        $headers .= "To: <{$to}>\r\n";
        $headers .= "Subject: " . encodeHeaderValue($subject) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "Content-Transfer-Encoding: quoted-printable\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "Message-ID: <" . time() . "." . md5($to . $subject) . "@nosybesecretislands.com>\r\n";

        $body = quoted_printable_encode($body);
        fputs($smtp, $headers . "\r\n" . $body . "\r\n.\r\n");
        $resp = $getResp();

        fputs($smtp, "QUIT\r\n");
        fclose($smtp);

        return strpos($resp, '250') !== false;
    } catch (Exception $e) {
        debugLog("Exception: " . $e->getMessage());
        return false;
    }
}

$sent = sendSMTPEmail(
    $smtpHost, $smtpPort, $smtpUsername, $smtpPassword, $smtpEncryption,
    $fromAddress, $fromName, $toAddress, $emailSubject, $emailBody, $replyTo
);

debugLog("Formulaire [$formType] — envoi " . ($sent ? 'OK' : 'ÉCHEC'));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès !']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Échec de l\'envoi. Veuillez réessayer ou nous contacter directement.']);
}
