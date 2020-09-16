var userNameParam = undefined;
let users = "";
let timeout;
let id;
let branchCounter;
function encrypt(str) {
    var crypt = new JSEncrypt();
    crypt.setKey(pub_key)
    return crypt.encrypt(str);
}

async function resetPassword() {
    let mailAddress = document.getElementById("mailForSendPasswordInput").value;
    let email = {
        email: mailAddress
    };
    $("#resetPasswordModal").modal('hide');
    $("#myModal").modal('hide');
    waitResponse();
    let x = JSON.stringify(email);
    try {
        let res = null;
        res = await fetch('/forgotPassword', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            recievedResponse();
        } else if (res.status == 404)
            alert("Reset password was failed");
    } catch (error) {
        alert("error");
    }
}
async function signUpUser() {
    let password = document.getElementById("passwordUserSignUp").value;
    let user = {
        userName: document.getElementById("userNameUserSignUp").value,
        password: encrypt(password),
        firstName: document.getElementById("firstNameUserSignUp").value,
        LastName: document.getElementById("lastNameUserSignUp").value,
        streetAndNumber: document.getElementById("streetAndNumberAddressUserSignUp").value,
        city: document.getElementById("cityAddressUserSignUp").value,
        state: document.getElementById("stateAddressUserSignUp").value,
        phoneNumber: document.getElementById("phoneNumberUserSignUp").value,
        mailAddress: document.getElementById("mailAddressUserSignUp").value,
        userCategory: "customer",
        branchNumber: "null"
    };
    let x = JSON.stringify(user);
    $("#signUpModal").modal('hide');
    $("#myModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/addUser', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            await Login(user.userName, password);
        } else if (res.status == 404)
            alert("Sign up action was failed");
    } catch (error) {
        alert("error");
    }
}

async function Login() {
    let user = {
        user_name: document.getElementById("u_name").value,
        password: document.getElementById("u_password").value
    };
    let x = JSON.stringify(user);
    try {
        let res = null;
        res = await fetch('/confirm_login', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            userNameParam = user.user_name;
            let url = '?username=' + user.user_name;
            window.history.replaceState(null, null, url);
            $.get("nav", {
                    user_name: userNameParam
                })
                .done(function(data) {
                    $('#navigation').html(data);
                })
                .fail(function() {
                    alert("error Login");
                })
            $("#login_modal").modal('hide');
        } else if (res.status == 404)
            alert("User Name Or Password Are Not Correct");
    } catch (error) {
        alert("error Login");
    }
}
async function confirmLogin() {
    waitResponse();
    await Login(document.getElementById("uname").value,
        document.getElementById("psw").value);
}

async function logout() {
    await fetch('/logout', {
        method: 'POST',
        credentials: 'include'
    });
}

async function loadAbout() {
    $.get("about")
        .done(function(data) {
            $('#content').html(data);
        })
        .fail(function() {
            alert("error loadAbout");
        })
}

async function loadContact() {
    $.get("contact")
        .done(function(data) {
            $('#content').html(data);
        })
        .fail(function() {
            alert("error loadContact");
        })
}

async function loadUsers() {
    var urlParams = new URLSearchParams(window.location.search);
    userNameParam = urlParams.get('username');
    $.get("users", {
            user_name: userNameParam
        })
        .done(function(data) {
            $('#content').html(data);
			$('#content').ready(
			function(){
				updateBranchNumberSelectChangeStatus();
				$(document).on("click", ".card-link", function () {
					var user_name_id = $(this).data('username-id');
					$(".modal-body #user_name_user_update").attr("value", user_name_id);
					var password_id = $(this).data('password-id');
					$(".modal-body #password_user_update").attr("value", password_id);
					var fname_id = $(this).data('first-id');
					$(".modal-body #fname_user_update").attr("value", fname_id);
					var lname_id = $(this).data('last-id');
					$(".modal-body #lname_user_update").attr("value", lname_id);
					var street_id = $(this).data('street-id');
					$(".modal-body #street_user_update").attr("value", street_id);
					var city_id = $(this).data('city-id');
					$(".modal-body #city_user_update").attr("value", city_id);
					var state_id = $(this).data('state-id');
					$(".modal-body #state_user_update").attr("value", state_id);
					var phone_id = $(this).data('phone-id');
					$(".modal-body #phone_user_update").attr("value", phone_id);
					var mail_id = $(this).data('mail-id');
					$(".modal-body #mail_user_update").attr("value", mail_id);
					
					var user_name_id_c = $(this).data('username-id');
					$(".modal-body #user_name_customer_update").attr("value", user_name_id_c);
					var password_id_c = $(this).data('password-id');
					$(".modal-body #password_customer_update").attr("value", password_id_c);
					var fname_id_c = $(this).data('first-id');
					$(".modal-body #fname_customer_update").attr("value", fname_id_c);
					var lname_Id_c = $(this).data('last-id');
					$(".modal-body #lname_customer_update").attr("value", lname_Id_c);
					var street_id_c = $(this).data('street-id');
					$(".modal-body #street_customer_update").attr("value", street_id_c);
					var city_id_c = $(this).data('city-id');
					$(".modal-body #city_customer_update").attr("value", city_id_c);
					var state_id_c = $(this).data('state-id');
					$(".modal-body #state_customer_update").attr("value", state_id_c);
					var phone_id_c = $(this).data('phone-id');
					$(".modal-body #phone_customer_update").attr("value", phone_id_c);
					var mail_id_c = $(this).data('mail-id');
					$(".modal-body #mail_customer_update").attr("value", mail_id_c);
				});
			}
			)
        })
        .fail(function() {
            alert("error loadUsers");
        })
}
async function loadStore() {
    $.get("store")
        .done(function(data) {
            $('#content').html(data);
        })
        .fail(function() {
            alert("error");
        })
}

async function loadChat() {
    $.get("chat")
        .done(function(data) {
            $('#content').html(data);
        })
        .fail(function() {
            alert("error");
        })
}
async function loadBranches() {
    $.get("branches")
        .done(function(data) {
            $('#content').html(data);
			$('#content').ready(
			function(){
                updateBranchNumberCounter();
                updateBranchNumberSelectChangeStatus();
                $(document).on("click", ".card-link", function () {
                    var bnumber_id = $(this).data('bnum-id');
                    $(".modal-body #bnumber_update").attr("value", bnumber_id);
                    var phone_id = $(this).data('phone-id');
                    $(".modal-body #branch_phone_update").attr("value", phone_id);
                    var active_id = $(this).data('active-id');
                    $(".modal-body #active_update").attr("value", active_id);
                    var street_id = $(this).data('street-id');
                    $(".modal-body #branch_street_update").attr("value", street_id);
                    var number_id = $(this).data('number-id');
                    $(".modal-body #branch_street_number_update").attr("value", number_id);
                    var city_id = $(this).data('city-id');
                    $(".modal-body #branch_city_update").attr("value", city_id);
                    var state_id = $(this).data('state-id');
                    $(".modal-body #branch_state_update").attr("value", state_id);
                });
			}
			)
        })
        .fail(function() {
            alert("error loadBranches");
        })
}

async function loadCatalog() {
    $.get("catalog")
        .done(function(data) {
            $('#content').html(data);
        })
        .fail(function() {
            alert("error loadCatalog");
        })
}
async function loadWorkerCatalog() {
    $.get("worker_catalog")
        .done(function(data) {
            $('#content').html(data);
            $('#content').ready(
                function(){
                    $(document).on("click", ".card-link", function () {
                        var name_id = $(this).data('name-id');
                        $(".modal-body #name_update").attr("value", name_id);
                        var creator_id = $(this).data('creator-id');
                        $(".modal-body #creator_update").attr("value", creator_id);
                        var price_id = $(this).data('price-id');
                        $(".modal-body #price_update").attr("value", price_id);
                        var img_id = $(this).data('img-id');
                        $(".modal-body #img_update").attr("value", img_id);
                        var type_of_image_id = $(this).data('type_of_image-id');
                        $(".modal-body #type_of_image_update").attr("value", type_of_image_id);
                    });
                    }
                    )
        })
        .fail(function() {
            alert("error loadSupplierCatalog");
        })
}
function addToCart(numOfItems, name, creator, price, imageContentType, imageData, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name && cartItemImages[i].src == imageSrc) {
            alert('This item is already added to the cart')
            return
        }
    }
    id = cartItemNames.length;
    var cartRowContents = `
        <div class="cart-item cart-column">
			<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}$</span>
        <div class="cart-quantity cart-column">
            <input id="input${id}${name}" class="cart-quantity-input" type="number" onchange="quantityChanged('input${id}${name}', '${name}', '${imageSrc}', '${imageContentType}', '${imageData}')" value="1">
            <button id="button${id}${name}" class="btn btn-danger" type="button" onclick="removeCartItem('button${id}${name}', '${name}', '${imageSrc}', '${imageContentType}', '${imageData}')">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateCartTotal();
    addItemToCart(name, price, imageContentType, imageData);
}
async function addItemToCart(name, price, imageContentType, imageData) {
    let itemInCart = {
        name: name,
        price: price,
        imageContentType: imageContentType,
        imageData: imageData,
        quantity: 1
    };
    let x = JSON.stringify(itemInCart);
    try {
        let res = null;
        res = await fetch('/add_to_cart', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
            credentials: 'include'
        }, function() {});

        if (res.status == 200) {
            recievedResponse();
        } else if (res.status == 404)
            alert("Add item to cart action was failed");
    } catch (error) {
        alert("error");
    }
}
function quantityChanged(id, name, imageSrc, imageContentType, imageData) {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name && cartItemImages[i].src == imageSrc) {
            if (isNaN(document.getElementById(id).value) || document.getElementById(id).value <= 0) {
                document.getElementById(id).value = 1;
            }
            updateCartTotal();
            updateQuantity(name, imageContentType, imageData, document.getElementById(id).value);
            return
        }
    }
}

async function updateQuantity(name, imageContentType, imageData, quantity) {
    let itemInCart = {
        name: name,
        imageContentType: imageContentType,
        imageData: imageData,
        quantity: quantity
    };
    let x = JSON.stringify(itemInCart);
    try {
        let res = null;
        res = await fetch('/update_items_in_cart_quantity', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
            credentials: 'include'
        });
        if (res.status == 200) {
            recievedResponse();
        } else if (res.status == 404)
            alert("Update product quantity action was failed");
    } catch (error) {
        alert("error");
    }
}

async function deleteItemInCart(name, imageContentType, imageData) {
    let item = {
        name: name,
        imageContentType: imageContentType,
        imageData: imageData
    };
    let x = JSON.stringify(item);
    try {
        let res = null;
        res = await fetch('/delete_item_in_cart', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
            credentials: 'include'
        });
        if (res.status == 200) {
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete product action was failed");
    } catch (error) {
        alert("error");
    }
}


function removeCartItem(id, name, imageSrc, imageContentType, imageData) {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name && cartItemImages[i].src == imageSrc) {
            document.getElementById(id).parentElement.parentElement.remove();
            updateCartTotal();
            deleteItemInCart(name, imageContentType, imageData);
            return;
        }
    }
}
async function emptyCart() {
    try {
        let res = null;
        res = await fetch('/empty_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
            credentials: 'include'
        });
        if (res.status == 200) {
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete product action was failed");
    } catch (error) {
        alert("error");
    }
}

function purchaseClicked(itemsInCartArray) {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image');

    emptyCart();
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '$';
}

async function onLoad() {
    if (window.location.href.includes('#')) {
        let x = window.location.href.substr(window.location.href.indexOf('#') + 1);
        switch (x) {
           // case "login":
            //    loadLogin();
            case "about":
                loadAbout();
                break;
            case "catalog":
                loadCatalog();
                break;
            case "worker_catalog":
                loadWorkerCatalog();
                break;
            case "contact":
                loadContact();
                break;
            case "users":
                loadUsers();
                break;
            case "branches":
                loadBranches();
                break;
            case "chat":
                loadChat();
                break;
            case "store":
                loadStore();
                break;
            default:
                loadAbout();
                break;
        }
    } else {
        loadAbout();
    }
    loadNav();
}

async function loadNav() {
    var urlParams = new URLSearchParams(window.location.search);
    userNameParam = urlParams.get('username');
    $.get("nav", {
            user_name: userNameParam
        })
        .done(function(data) {
            $('#navigation').html(data);
        })
        .fail(function() {
            alert("error loadNav");
        })
}

async function updateBranchNumberCounter() {
    try {
        let response = await fetch("/all_bnumbers");
        let branchNumbersRes = await response.json();
        branchCounter = branchNumbersRes.length+1;
    } catch (error) { console.error('Error: ', error); }
}



async function updateBranchNumberSelectChangeStatus() {
	var x = document.getElementById("bnumber_select_change_status");
	try {
		let response = await fetch("/active_bnumbers");
		let branchNumbersRes = await response.json();
		branchNumbersRes.forEach(function (branchNumberRes, index) {
			var option = document.createElement("option");
			option.text = branchNumberRes;
			x.add(option);
		});
    } catch (error) { console.error('Error: ', error); }
}


async function showBranchNumberSelect(event) {
	let x = this.options[this.selectedIndex].text;
	switch (x) {
            case "Customer":
                $("#bnumber_select_user").hide();
                break;
            case "Worker":
                $("#bnumber_select_user").show();
                break;
            case "Manager":
                $("#bnumber_select_user").show();
                break;
            case "Supplier":
                $("#bnumber_select_user").hide();
                break;
        }
}

async function showBranchNumberSelectUpdate(event) {
	let x = this.options[this.selectedIndex].text;
	switch (x) {
            case "Customer":
                $("#bnumberSelectUpdate").hide();
                break;
            case "Worker":
                $("#bnumberSelectUpdate").show();
                break;
            case "Manager":
                $("#bnumberSelectUpdate").show();
                break;
            case "Supplier":
                $("#bnumberSelectUpdate").hide();
                break;
        }
}

async function showBranchNumberSelectChangeStatus(event) {
	let x = this.options[this.selectedIndex].text;
	switch (x) {
            case "Customer":
                $("#bnumber_select_change_status").hide();
                break;
            case "Worker":
                $("#bnumber_select_change_status").show();
                break;
            case "Manager":
                $("#bnumber_select_change_status").show();
                break;
            case "Supplier":
                $("#bnumber_select_change_status").hide();
                break;
        }
}

async function addBranch() {
	let branch = {
        street: document.getElementById("street").value,
        number: document.getElementById("number").value,
		city: document.getElementById("city").value,
		state: document.getElementById("state").value,
        bnumber: branchCounter++,
        phone: document.getElementById("phone").value,
		active: document.getElementById("active").checked
    };
    let x = JSON.stringify(branch);
	$("#addBranchModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/add_branch', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        }, function() {
		});
		
		if (res.status == 200) {
            loadBranches();
            recievedResponse();
        } else if (res.status == 404)
            alert("Add branch action was failed");
    } catch (error) {
        alert("error addBranch");
    }
}

async function addUser() {
	var bn = "null";
	var selectorUC = document.getElementById("category_user");
	var uc = selectorUC.options[selectorUC.selectedIndex].value;
	if(uc == "Worker" || uc == "Manager"){
		var selectorBN = document.getElementById("bnumber_select_user");
		bn = selectorBN.options[selectorBN.selectedIndex].value;
	}
	let user = {
		user_name: document.getElementById("user_name_user").value,
        password: encrypt(document.getElementById("password_user").value),
		fname: document.getElementById("fname_user").value,
		lname: document.getElementById("lname_user").value,
        street: document.getElementById("street_user").value,
		city: document.getElementById("city_user").value,
		state: document.getElementById("state_user").value,
		phone: document.getElementById("phone_user").value,
		mail: document.getElementById("mail_user").value,
		category: uc,
		bnumber: bn
    };
    let x = JSON.stringify(user);
    $("#addUserModal").modal('hide');
    waitResponse();

	try {
        let res = null;
        res = await fetch('/add_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
        });

		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Add user action was failed");
    } catch (error) {
        alert("error addUser");
    }
}
function checking()
{

}
async function addFirstUser() {//fix branch
    var selectorBN = document.getElementById("bnumber_select_user");
    let bn=null;
    if(selectorBN.options.size)
        bn = selectorBN.options[selectorBN.selectedIndex].value;
    //password: encrypt(document.getElementById("password_user").value),
    let user = {
        user_name: document.getElementById("user_name_user").value,
        password: document.getElementById("password_user").value,
        fname: document.getElementById("fname_user").value,
        lname: document.getElementById("lname_user").value,
        street: document.getElementById("street_user").value,
        city: document.getElementById("city_user").value,
        state: document.getElementById("state_user").value,
        phone: document.getElementById("phone_user").value,
        mail: document.getElementById("mail_user").value,
        category: "manager",
        bnumber: bn
    };
    let x = JSON.stringify(user);
    $("#addWebManagerModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/add_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
        });

        if (res.status == 200) {
            loadNav();
            recievedResponse();
        } else if (res.status == 404)
            alert("Add user action was failed");
    } catch (error) {
        alert("error addFirstUser");
    }
}
async function addCustomer() {
	let customer = {
		user_name: document.getElementById("user_name_customer").value,
        password: encrypt(document.getElementById("password_customer").value),
		fname: document.getElementById("fname_customer").value,
		lname: document.getElementById("lname_customer").value,
        street: document.getElementById("street_customer").value,
		city: document.getElementById("city_customer").value,
		state: document.getElementById("state_customer").value,
		phone: document.getElementById("phone_customer").value,
		mail: document.getElementById("mail_customer").value,
		category: "customer",
		bnumber: "null"
    };
    let x = JSON.stringify(customer);
	$("#addCustomerModal").modal('hide');
    waitResponse();
	
	try {
        let res = null;
        res = await fetch('/add_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Add user action was failed");
    } catch (error) {
        alert("error addCustomer");
    }
}

async function updateUser() {
	let user = {
		user_name: document.getElementById("user_name_user_update").value,
        password: encrypt(document.getElementById("password_user_update").value),
		fname: document.getElementById("fname_user_update").value,
		lname: document.getElementById("lname_user_update").value,
        street: document.getElementById("street_user_update").value,
		city: document.getElementById("city_user_update").value,
		state: document.getElementById("state_user_update").value,
		phone: document.getElementById("phone_user_update").value,
		mail: document.getElementById("mail_user_update").value
    };
    let x = JSON.stringify(user);
	$("#updateUserModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/update_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Update user action was failed");
    } catch (error) {
        alert("error updateUser");
    }
}

async function deleteUser() {
	let user = {
		user_name: document.getElementById("user_name_user_update").value,
		password: document.getElementById("password_user_update").value
    };
    let x = JSON.stringify(user);
	$("#deleteUserModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/delete_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete user action was failed");
    } catch (error) {
        alert("error deleteUser");
    }
}

async function changeStatusUser() {
	let user = {
		user_name: document.getElementById("user_name_user_update").value,
        password: encrypt(document.getElementById("password_user_update").value),
		category: document.getElementById("category_change_user_status").value,
		bnumber: document.getElementById("bnumber_select_change_status").value
    };
    let x = JSON.stringify(user);
	$("#ChangeStatusUserModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/change_status_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Change status user action was failed");
    } catch (error) {
        alert("error changeStatusUser");
    }
}

async function updateCustomer() {
	let user = {
		user_name: document.getElementById("user_name_customer_update").value,
        password: encrypt(document.getElementById("password_customer_update").value),
		fname: document.getElementById("fname_customer_update").value,
		lname: document.getElementById("lname_customer_update").value,
        street: document.getElementById("street_customer_update").value,
		city: document.getElementById("city_customer_update").value,
		state: document.getElementById("state_customer_update").value,
		phone: document.getElementById("phone_customer_update").value,
		mail: document.getElementById("mail_customer_update").value
    };
    let x = JSON.stringify(user);
	$("#updateCustomerModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/update_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Update user action was failed");
    } catch (error) {
        alert("error updateCustomer");
    }
}

async function deleteCustomer() {
	let user = {
		fname: document.getElementById("fname_customer_update").value,
		lname: document.getElementById("lname_customer_update").value
    };
    let x = JSON.stringify(user);
	$("#deleteCustomerModal").modal('hide');
    waitResponse();
	try {
        let res = null;
        res = await fetch('/delete_user', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
		if (res.status == 200) {
            loadUsers();
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete user action was failed");
    } catch (error) {
        alert("error deleteCustomer");
    }
}

async function addPoster() {
    $("#addPosterModal").modal('hide');
    waitResponse();

    var fd = new FormData($('#addPosterForm').get(0));

    $.ajax({
        url: '/add_poster',
        data: fd,
        type: 'POST',
        processData: false,
        contentType: false
    }).done(function(data) {
        recievedResponse();
        loadSupplierCatalog();
    })
        .fail(function() {
            alert("Add poster action was failed");
        })
    event.preventDefault();
}
async function deletePoster() {
    let poster = {
        name: document.getElementById("name_update").value,
    };
    let x = JSON.stringify(poster);
    $("#deletePosterModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/delete_poster', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            loadSupplierCatalog();
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete poster action was failed");
    } catch (error) {
        alert("error deletePoster");
    }
}
async function deleteBranch() {
    let branch = {
        bnumber: document.getElementById("bnumber_update").value,
    };
    let x = JSON.stringify(branch);
    $("#deleteBranchModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/delete_branch', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            loadBranches();
            recievedResponse();
        } else if (res.status == 404)
            alert("Delete branch action was failed");
    } catch (error) {
        alert("error deleteBranch");
    }
}

async function updatePoster() {
    let poster = {
        name: document.getElementById("name_update").value,
        price: document.getElementById("price_update").value,
    };
    let x = JSON.stringify(poster);
    $("#updatePosterModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/update_poster', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            loadSupplierCatalog();
            recievedResponse();
        } else if (res.status == 404)
            alert("Update poster action was failed");
    } catch (error) {
        alert("error updatePoster");
    }
}
async function updateBranch() {
    let branch = {
        bnumber: document.getElementById("bnumber_update").value,
        phone: document.getElementById("branch_phone_update").value,
        active: document.getElementById("active_update").value,
        number: document.getElementById("branch_street_number_update").value,
        street: document.getElementById("branch_street_update").value,
        city: document.getElementById("branch_city_update").value,
        state: document.getElementById("branch_state_update").value,

    };
    let x = JSON.stringify(branch);
    $("#updateBranchModal").modal('hide');
    waitResponse();
    try {
        let res = null;
        res = await fetch('/update_branch', {
            method: 'POST',
            body: x,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            }
        });
        if (res.status == 200) {
            loadBranches();
            recievedResponse();
        } else if (res.status == 404)
            alert("Update user action was failed");
    } catch (error) {
        alert("error updateBranch"+error);
    }
}
function fileOrUrl(value) {
    if (value == "file") {
        document.getElementById("posterImg").disabled = false;
        document.getElementById("posterImgUrl").disabled = true;
    } else if (value == "url") {
        document.getElementById("posterImg").disabled = true;
        document.getElementById("posterImgUrl").disabled = false;
    }
}
function fileOrUrl_update(value) {
    if (value == "file") {
        document.getElementById("posterImg_update").disabled = false;
        document.getElementById("posterImgUrl_update").disabled = true;
    } else if (value == "url") {
        document.getElementById("posterImg_update").disabled = true;
        document.getElementById("posterImgUrl_update").disabled = false;
    }
}

function waitResponse(){
    $("#statusModal").modal('show');

    timeout = setTimeout(() => {
        $("#timeoutErrorModal").modal({backdrop : 'static', keyboard : false, show : true});

        clearTimeout(timeout)
    }, 10000);
}

function recievedResponse(){
    $("#statusModal").modal('hide');

    clearTimeout(timeout);
}