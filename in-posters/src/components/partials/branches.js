<;;;!DOCTYPE html>
<html lang="en">
  </head>;;;
  <body>
    <div class="container-fluid" id="branches">
      <div class="title">
        <h1>Branches</h1>
        <a href="#addBranchModal" class="icon" data-toggle="modal">
          <i class="fa fa-plus-circle" title="add new branch"></i>
        </a>
		 <a href="#branches" class="icon">
          <i class="fa fa-refresh" title="refresh" onclick="loadBranches()"></i>
        </a>
      </div>
      <div class="row">
        <% branchesArray.forEach(function(branch) { %>
        <div class="col-sm-3">
          <div class="card">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe id="gmap_canvas" alt="google maps"
                  src="https://maps.google.com/maps?q=<%=branch.address.street%>%20<%=branch.address.number%>%20
                  <%=branch.address.city%>&t=&z=15&ie=UTF8&iwloc=&output=embed">
                </iframe>
              </div>
            </div>
            <div class="card-header">
              <h3 class="card-title">Branch <%=branch.bnumber%></h3>
              <h5 class="text-muted"><%=branch.active ? "active" : "not active"%></h5>
            </div>
            <div class="branch-body">
              <h4><%=branch.address.street + " " + branch.address.number + ", " + branch.address.city +
                ", " + branch.address.state %></h4>
              <h5><%=branch.phone%></h5>
            </div>
			  <a href="#deleteBranchModal" class="card-link" data-toggle="modal" data-bnum-id="<%= branch.bnumber %>">
				  <i class="fa fa-trash" title="delete branch"></i>
			  </a>
			  <a href="#updateBranchModal" class="card-link" data-toggle="modal" data-bnum-id="<%= branch.bnumber %>"
			   data-phone-id="<%= branch.phone %>"
				 data-active-id="<%= branch.active %>"
				 data-street-id="<%= branch.address.street %>"
				 data-number-id="<%= branch.address.number %>"
				 data-city-id="<%= branch.address.city %>"
				 data-state-id="<%= branch.address.state %>"
			  >
				  <i class="fa fa-edit" title="update branch details"></i>
			  </a>
          </div>
        </div>
        <% }); %>
      </div>
    </div>;;;
	<!-- Modal HTML -->
			<div id="addBranchModal" class="modal fade">
				<div class="modal-dialog modal-login">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Add Branch</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<input type="text" class="form-control" id="street"  placeholder="Street" required="required" autofocus>
								</div>
								<div class="form-group">
									<input type="number" min="0" class="form-control" id="number"  placeholder="House Number" required="required">
								</div>
								<div class="form-group">
									<input type="text" class="form-control" id="city"  placeholder="City" required="required">
								</div>
								<div class="form-group">
									<input type="text" class="form-control" id="state"  placeholder="State" required="required">
								</div>
								<!--<div class="form-group">
									<select  id="bnumberSelectForBranches" class="form-control">
										<option selected disabled>Branch Number</option>
									</select>
									<input type="text" class="form-control" id="bnumberSelectForBranches"  placeholder="Branch Number" required="required">

								</div>-->
								<div class="form-group">
									<input type="tel" class="form-control" id="phone"  placeholder="Phone" required="required">
								</div>
								<div class="form-group">
									<input type="checkbox" id="active"  checked> Active<br>
								</div>
								<div class="form-group">
									<button id="addBranchButton" type="button" class="btn btn-primary btn-lg btn-block login-btn" onclick="addBranch()">Add</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>;;;
	<div id="deleteBranchModal" class="modal fade">
		<div class="modal-dialog modal-login">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete Branch</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							Are you sure you want to delete this branch?<br><br>
							<button id="deleteBranchButton" type="button" class="btn btn-primary btn-lg btn-block login-btn" onclick="deleteBranch()">Delete</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>;;;
	<div id="updateBranchModal" class="modal fade">
		<div class="modal-dialog modal-login">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Update Branch</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<input type="number" class="form-control" id="bnumber_update"  placeholder="Branch Number" disabled>
						</div>
						<div class="form-group">
							<input type="text" class="form-control" id="branch_street_update"  placeholder="Street" autofocus>
						</div>
						<div class="form-group">
							<input type="number" min="0" class="form-control" id="branch_street_number_update"  placeholder="House Number" >
						</div>
						<div class="form-group">
							<input type="text" class="form-control" id="branch_city_update"  placeholder="City" >
						</div>
						<div class="form-group">
							<input type="text" class="form-control" id="branch_state_update"  placeholder="State" >
						</div>
						<div class="form-group">
							<input type="tel" class="form-control" id="branch_phone_update"  placeholder="Phone">
						</div>
						<div class="form-group">
							<input type="checkbox" id="active_update"  checked> Active<br>
						</div>
						<div class="form-group">
							<button id="updateBranchButton" type="button" class="btn btn-primary btn-lg btn-block login-btn" onclick="updateBranch()">Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>;;;
  </body>
</html>