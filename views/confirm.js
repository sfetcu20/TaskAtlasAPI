module.exports = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>
<body>
    <h1>{{title}}</h1>
    <p>Dear {{name}},</p>
    <p>Thank you for registering an account with us. Please click the link below to activate your account:</p>
    <p><a href="{{link}}">Activate Account</a></p>
    <p>If you did not register for an account, please ignore this email.</p>
    <p>Best regards,<br>{{team}}</p>
</body>
</html>
`;
