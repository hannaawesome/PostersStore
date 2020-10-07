import PostersGallary from '../../components/postersGallary'
import React, {Component} from 'react';
import RegisterByAdmin from "../addUserByAdmin";
import API from "../../utils/API";

class HomePage extends Component {
    state = {
        users: []
    };
     componentDidMount() {
         // API.getUsers()
         //     .then(res => this.setState({ users: res.data }))
         //    .catch(err => console.log(err));
 }
    render() {
        //if(this.state.users.length>0)
        //     return (
        //         <div>
        //             <PostersGallary/>
        //         </div>
        //     );
        // else
            return (
                <div>
                    <RegisterByAdmin/>
                </div>
            );
    }
}
export default HomePage;

