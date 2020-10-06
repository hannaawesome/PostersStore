import PostersGallary from '../../components/postersGallary'
import React, {Component} from 'react';
import RegisterByAdmin from "../addUserByAdmin";

 function HomePage(){
     const [users, setUsers] = React.useState([]);
     async function fetchUsers() {
        const fullResponse = await fetch(
            "/get_users");
        const responseJson = await fullResponse.json();
        setUsers(responseJson.length()>0);
    }
    fetchUsers().then(r =>{});
    if(users.length>0)
        return (
            <div>
                <PostersGallary/>
            </div>
        );
    else
        return (
            <div>
                <RegisterByAdmin/>
            </div>
        );

}

export default HomePage;
