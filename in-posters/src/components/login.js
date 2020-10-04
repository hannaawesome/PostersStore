<;;!DOCTYPE html>
<html lang="en">
<head>
    <% include partials %>
</head>
<body>
<header>
    <% include partials %>
</header>

    <div id="content"></div>
    <!-- Modal HTML -->
    <div id="login_modal" class="modal fade">
        <div class="modal-dialog modal-login">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Login</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="u_name"  placeholder="User Name" required="required">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="u_password"  placeholder="Password" required="required">
                        </div>
                        <div class="form-group">
                            <button id="login" type="button" class="btn btn-primary btn-lg btn-block login-btn" onclick="Login()">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
<script>
    src="functionality.js";

$("#login_modal").modal('show');
</script>
<footer>
    <% include partials %>
</footer>
</body>
</html>;;