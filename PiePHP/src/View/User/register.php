<div id="container">
    <h1>Register</h1>
    <form action='/PiePHP/user/register' method='post'
    "post">
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

    <input type="submit" id='submit' value='Register'
           onclick="location.href = 'http://localhost:8888/PiePHP/user/register';">
    </form>
</div>