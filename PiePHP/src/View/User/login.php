<div id="container">
    <h1>Connexion</h1>
    <form action='/PiePHP/user/login' method="post">
        <div id="email_header">
            <p>Email</p>
        </div>
        <div id="email">
            <input type="email" name="email" id="input" placeholder="Email">
        </div>
        <div id="password_header">
            <p>Password</p>
        </div>
        <div id="password">
            <input type="password" name="password" id="input" placeholder="Password">
        </div>

        <input type="Submit" id="submit" value="Submit">
        <input type="button" id="register" value="Register"
               onclick="location.href = 'http://localhost:8888/PiePHP/user/register';">
    </form>
</div>
