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
                <p>Message: $message</p>
                <br />
                <p>Name: $name</p>
                <p>Email: <a href='#!'>$email</a></p>
                </body>
                 </html>
                " ;
                mail( $mail_to_send_to, "Message from your website", $body, $headers );
        }
?>