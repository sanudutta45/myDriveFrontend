import React, {Component} from "react";
import Auth from "../service/Auth";

const UserContext = React.createContext("user");
const AuthContext = React.createContext("userService");

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.userService = props.service || new Auth();
        this.userService.onUserChange = (newUser) => this.setUser(newUser);
        this.state = {
            user: this.userService.getUser()
        }
    }

    setUser = (newUser) =>{
        this.setState(({user})=>({
            user:newUser,
        }))
    }

    render() {
        return(
            <AuthContext.Provider value={this.userService}>
                <UserContext.Provider value={this.state.user}>
                    {this.props.children}
                </UserContext.Provider>
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
const UserConsumer = UserContext.Consumer;

function AuthAndUserConsumer({children}){
    return (
        <AuthConsumer>
            {auth=>(
                <UserConsumer>
                    {user => children({auth,user})}
                </UserConsumer>
            )}
        </AuthConsumer>
    )
}

export { AuthAndUserConsumer, UserConsumer, AuthProvider};