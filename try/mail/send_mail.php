<?php
if(isset($_POST['send_mail']))
{
 $name=$_POST['sender_name'];
 $sender_email=$_POST['sender_email'];
 $send_to=$_POST['reciever_email'];
 $subject=$_POST['subject'];
 $message=$_POST['message'];
	
 $attachment=$_FILES["attach_file"]["tmp_name"];
 $folder="files/";
 $file_name=$_FILES["attach_file"]["name"];
 move_uploaded_file($_FILES["attach_file"]["tmp_name"], "$folder".$_FILES["attach_file"]["name"]);
	
 require_once('class.phpmailer.php');	
 $send_mail = new PHPMailer();
 $send_mail->From = $sender_email;
 $send_mail->FromName = $name;
 $send_mail->Subject = $subject;
 $send_mail->Body = $message;
 $send_mail->AddAddress($send_to);

 $attach_file = $folder."".$file_name;
 $send_mail->AddAttachment($attach_file);

 return $send_mail->Send();
}
?>