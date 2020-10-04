<;;!DOCTYPE html>
<html lang="en">
	<head>
		<% include partials %>
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
	</head>
	<body onload="onLoad()">
		<header>
			<% include partials %>
			<p>Times here: <%= count %></p>
		</header>
		<main>

			<div id="content"></div>
			<!-- Modal HTML -->

			
			<div id="statusModal" class="modal fade">
				<div class="modal-dialog modal-login">
					<div class="modal-content">
						<div class="modal-header text-center">
							<h4 class="modal-title">Please wait...</h4>
							<i class='fa fa-spinner fa-spin' style='font-size:48px; padding:30px;'></i>
						</div>
					</div>
				</div>
			</div>
			<div id="timeoutErrorModal" class="modal fade">
				<div class="modal-dialog modal-login">
					<div class="modal-content">
						<div class="modal-header text-center">
							<h4 class="modal-title">Timeout Error</h4>
							<br>
							<p>Please Press To Refresh The Page</p>
							<br>
							<a href="#about" class="icon">
								<i class="fa fa-refresh" title="refresh" onclick="location.reload()"></i>
							</a>
						</div>
					</div>
				</div>
			</div>

		</main>
		<footer>
			<% include partials %>
		</footer>
	</body>;;
</html>