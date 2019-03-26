import React,{Component} from 'react';


class LoginPage extends Component{
    state={
     username:null, 
     password:null,
     token:null,
     logged:"Log In"      
    }

    componentWillMount(){
        //Checkc if redirect to dashboard needed
        //get cookie
        const cachedUser = localStorage.getItem("username");
        console.log(cachedUser)
        if(cachedUser){
            let JSONUSer = JSON.parse(cachedUser);
            this.setState({username:JSONUSer.username, logged:"LOG OUT"});
        }
        
    }
    toggleLog = () =>
    {
        if(this.state.username){
            //delete cookie
            localStorage.removeItem("username");
            this.setState({logged:"LOG IN", username:null});
        }
        else{
            const newUser ={
                username:"abc",
                area:"aceria",
                rol:"eljefe",
                team:"lol"
            }
            //cookie
            localStorage.setItem("username", JSON.stringify(newUser));

            this.setState({logged:"LOG OUT", username:newUser.username});
            //delete cookie
        }
    }
    render(){
        return(
            <button onClick={this.toggleLog}>{this.state.logged}</button>
        );
    }
}


export default (LoginPage);