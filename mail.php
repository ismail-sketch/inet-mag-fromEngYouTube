<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
// $email = $_POST['user_email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
// $mail->Username = 'dzharuzov@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
// $mail->Password = '$dk820&123'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров



$mail->setFrom('villa-svetlana@gmx.at'); // от кого будет уходить письмо?
$mail->addAddress('gomudusu@p33.org');     // Кому будет уходить письмо

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = 'забронировали с' . date('d.m.y',$_POST["date_start"]) . ' по ' .date('d.m.y',$_POST["date_start"]). '<br>Его имя' .$_POST['name']. 'его телефон' .$_POST['phone']. 'его почта:' .$_POST['email'];
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: /');
}
?>