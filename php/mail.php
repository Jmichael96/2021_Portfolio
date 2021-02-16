<?php

if($_POST['action'] == 'callForm') {
                $mail_to_send_to = "jeffreyvh@ymail.com, jeffrey.vanhorn@yahoo.com" ;
                $from_email = "admin@codevh.com" ;
                $name = $_POST['name'] ;
                $email = $_POST['email'] ;
                $message = $_POST['message'] ;
                // headers
                $headers = "From: $from_email" . "\r\n" . "Reply-To: $mail_to_send_to" . "\r\n" ;
                $headers = "MIME-Version: 1.0" . "\r\n" ;
                $headers = "Content-type: text/html; multipart/mixed; charset=iso-8859-1" .  "\r\n" ;
                $body =
                "<html>
                <head>
                <title>Hello Mr. Dahmer</title>
                </head>
                <body>
                <p style='font-size: 1rem;'>$message</p>
                <br />
                <p style='font-size: 1rem;'><b>FROM</b> $name</p>
                <p style='font-size: 1rem;'><b>CONTACT ME @</b> <a href='#!' style='cursor: pointer; color: #008cff'>$email</a></p>
                </body>
                 </html>
                " ;
                mail( $mail_to_send_to, "WEEEOOOW YOU GOT A MESSAGE", $body, $headers );
        }
?>