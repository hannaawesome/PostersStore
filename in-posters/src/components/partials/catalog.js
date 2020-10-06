<;;;!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <main>
    <div class="container-fluid bg-grey" id="catalog">
      <div class="row">
        <div class="col-sm-4" id="catalog-info">
          <h2>Our Catalog</h2>
          <h4>bla bla bla....</h4>
          <p>bla bla bla....</p>
        </div>
        <div class="col-sm-8">
          <div id="myCarousel" class="carousel slide text-center" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators" id="indicators">
			<% for (var i = 0; i < postersArray.length; i++) { %>
				<% if (i == 0) { %>
				<li data-target="#myCarousel" data-slide-to="<%= i %>" class="active"></li>
				<% } else { %>
				<li data-target="#myCarousel" data-slide-to="<%= i %>"></li>
				<% } %>
			<% } %>
			</ol>
			
            <div class="carousel-inner" id="carousel">
			<% for (var i = 0; i < postersArray.length; i++) { %>
				<% if (i == 0) { %>
				<div class="item active">
                    <img src="data:<%= postersArray[i].type_of_image %>;base64,<%= postersArray[i].img %>"/>
					<div className="carousel-caption">
						<h3><%= postersArray[i].name + " (" + postersArray[i].creator + ") " %></h3>
						<p><%= postersArray[i].price + "$" %></p>
					</div>
				</div>
				<% } else { %>
				<div class="item">
                    <img src="data:<%= postersArray[i].type_of_image %>;base64,<%= postersArray[i].img %>"/>
					<div className="carousel-caption">
						<h3><%= postersArray[i].name + " (" + postersArray[i].creator + ") " %></h3>
						<p><%= postersArray[i].price + "$" %></p>
					</div>
				</div>
				<% } %>
			<% } %>
			</div>
            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>

  </main>
  </body>
</html>;;;