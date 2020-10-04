<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<!DOCTYPE html>
<html>
<body>
<div class="container">
    <div class="row">
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <h2 style="color:#c18de2;"><strong><br/>Reset Password</strong></h2>

            <hr>

            <form>
                <div class="form-group">
                    <input type="password" class="form-control" id="newPasswordResetPassword" name="newPasswordResetPassword" placeholder="New password">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="confirmNewPasswordResetPassword" id="confirmNewPasswordResetPassword" placeholder="Confirm password"
                           onkeyup="checkPassword()">
                </div>
                <div class="form-group">
                    <label id="pwmatch" name="pwmatch" style="display: none; color: #FF0000;">Passwords don't match</label>
                </div>
                <button class="btn btn-primary" id="updatePasswordButton" style="background:#c18de2; border: none;" onclick="updatePassword()" disabled>Update Password</button>

                <hr>

                <div class="form-group">
                    <label id="failureLabel" name="failureLabel" style="display: none; color: red; font-size: 18px;">Password reset was failed</label>
                </div>
                <div class="form-group">
                    <label id="successLabel" name="successLabel" style="display: none; color: green; font-size: 18px;">Password reset was successful</label>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>
<script src="jsencrypt.min.js"></script>

<script>
    let pub_key = `
---- BEGIN SSH2 PUBLIC KEY ----
AAAAB3NzaC1yc2EAAAABJQAAAQEAhEd98Q6XyRBstIJ2YIrkAC4zU1n38NFAXqlm
7EA6q8nXHNRIVvfdL2/ljcdkPJ3JQj+/oVk/naPSEdOiD05AR7jHc3Z84AdWMhoE
fRlk2eLm/IUelE05YnFAzKUe/EoNQgqGI7tFNa+wM9wJ/pJEsRrWjN2fsJtAfr9x
ReVYSsKID014sZNzniX2RGBJ9vG2Y4strcxp/tGJskDYuwLMsxpl9UrAFViwvPdI
7Xa3KK7J+3pjoKwN/sU6LAgTQF/PIfzDXIHG3hpG7D6Sf05WL0TecBIbiIZdNApj
qIKzoqlBGEA4aWlKew3Ca2ODw7eWaFgc3ojh7uy+b9tGnTvLAQ==
---- END SSH2 PUBLIC KEY ----
`

    function encrypt(str) {
        var crypt = new JSEncrypt();
        crypt.setKey(pub_key)
        return crypt.encrypt(str);
    }

    function encrypt(str) {
        var crypt = new JSEncrypt();
        crypt.setKey(pub_key)
        return crypt.encrypt(str);
    }

    async function checkPassword() {
        if (document.getElementById("newPasswordResetPassword").value != document.getElementById("confirmNewPasswordResetPassword").value) {
            document.getElementById("pwmatch").style.display = "block";
            document.getElementById("updatePasswordButton").disabled = true;
        } else {
            document.getElementById("pwmatch").style.display = "none";
            document.getElementById("updatePasswordButton").disabled = false;
        }
    }

    async function updatePassword() {
        let pass = document.getElementById("newPasswordResetPassword").value;
        let confirmPass = document.getElementById("confirmNewPasswordResetPassword").value;
        let tokenParam = window.location.href.substr(window.location.href.indexOf('reset/') + 6);
        let user = {
            password: encrypt(pass),
            token: tokenParam
        };
        let x = JSON.stringify(user);
        try {
            let res = null;
            res = await fetch('/updatePassword', {
                method: 'POST',
                body: x,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json; charset=utf-8'
                }
            });
            if (res.status == 200) {
                document.getElementById("successLabel").style.display = "block";
                let url = "/";
                window.history.replaceState(null, null, url);
                /*setTimeout((function() {
                                window.close();
                }), 4000);*/
            } else if (res.status == 404)
                document.getElementById("failureLabel").style.display = "block";
            setTimeout((function() {
                window.close();
            }), 4000);
        } catch (error) {
            debug("error");
        }
    }
</script>;