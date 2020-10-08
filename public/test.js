async function init() {
    var data = {
        e_mail: "ghvbjk",
        password: "hjk",
        fullName: {
            fName: "hbjl",
            lName: "vhbjk"
        },
        category: "Admin"
    };
    try {
        let res = null;
        res = await fetch('/add_user', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=utf-8'
            },
        });
    } catch (e) {
        console.log("did not succeed");
    }
}
