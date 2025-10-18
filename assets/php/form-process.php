<?php

// Cargar PHPMailer manualmente
require '../../PHPMailer/src/Exception.php';
require '../../PHPMailer/src/PHPMailer.php';
require '../../PHPMailer/src/SMTP.php';
require '../../PHPMailer/language/phpmailer.lang-es.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$errorMSG = "";
$emailA = "ryuzaki2469@gmail.com";
$emailB = "rodrigo.salazar.solano.97@gmail.com";

// Filtro
function filterData($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = filterData($_POST["name"]);
}

// Phone Number
if (empty($_POST["phone_number"])) {
    $errorMSG .= "Number is required ";
} else {
    $phone_number = filterData($_POST["phone_number"]);
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = filterData($_POST["email"]);
}

// COMPANY
if (empty($_POST["company"])) {
    $errorMSG .= "Company is required ";
} else {
    $company = filterData($_POST["company"]);
}

// BUSINESS_LINE
if (empty($_POST["business_line"])) {
    $errorMSG .= "Business line is required ";
} else {
    $business_line = filterData($_POST["business_line"]);
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = filterData($_POST["message"]);
}

if ($errorMSG == "") {
    try {
        // Crear instancia de PHPMailer
        $mail = new PHPMailer(true);
        
        // ============================================
        // CONFIGURACIÓN SERVIDOR
        // ============================================
        
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';        // Servidor
        $mail->SMTPAuth   = true;
        $mail->Username   = 'rold.art.01@gmail.com'; // Email
        $mail->Password   = 'geqromvbgxtpudef';      // Contraseña
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;           

        // Configuración adicional para mejor compatibilidad
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        

        // ============================================
        // CONFIGURACIÓN DEL EMAIL
        // ============================================
        
        // Remitente (usa un email de tu dominio)
        $mail->setFrom('rold.art.01@gmail.com', 'Formulario de Contacto Web');
        
        // Destinatario PRINCIPAL
        $mail->addAddress($emailA, 'Destinatario A');
        
        //Destinatario en COPIA
        $mail->addCC($emailB, 'Destinatario B');
        
        // Responder al email del usuario
        $mail->addReplyTo($email, $name);
        
        // Asunto
        $mail->Subject = 'Nuevo mensaje del formulario WEB - ' . date('d/m/Y H:i:s');
        
        // ============================================
        // CUERPO DEL EMAIL
        // ============================================

        $mail->Body = "
        NUEVO MENSAJE DEL FORMULARIO DE CONTACTO
        =========================================
        
        INFORMACIÓN DEL CONTACTO:
        ----------------------------
        Nombre: $name
        Teléfono: $phone_number
        Email: $email
        Empresa: $company
        Línea de negocio: $business_line
        
        MENSAJE:
        -----------
        $message
        
        -------------------------
        Enviado el: " . date('d/m/Y \a \l\a\s H:i:s') . "
        Desde el formulario de contacto del sitio web
        
        Este es un mensaje automático, no responder.
        ";
        
        // ============================================
        // ENVIAR EMAIL
        // ============================================
        
        $mail->send();
        
        // Éxito
        echo "success";
        
    } catch (Exception $e) {
        // Error detallado
        echo "Error: No se pudo enviar el mensaje. Detalles: " . $mail->ErrorInfo;
    }
    
} else {
    // Mostrar errores de validación
    echo $errorMSG;
}
?>