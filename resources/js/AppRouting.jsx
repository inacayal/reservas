/**
 * react basic
 */
import React, {
    Component
} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Login from './login/Login';
import Escritorio from './escritorio/Escritorio';
import Reserva from './reserva/Reserva';

import {
    POST
} from './app/utils/api';

class AppRouting extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:null,
            auth:false
        };
    }

    logUser(data){
        return POST({
            endpoint: '/login',
            data: JSON.stringify(data)
        }).then(
            res => {
                this.setState({
                    user:res.data.user,
                    auth:true
                })
            }
        ).catch(
            error => {
                console.log({auth:false});
            }
        );
    }

    render(){
        const st = this.state;
        return(
            <>
                <Router basename="/">
                    <Route path='/'
                        exact
                        render={
                            (match) => <div>culo</div>
                        }/>
                    <Route path='/escritorio'
                        exact
                        render={
                            (match) => (
                                <Escritorio auth={st.auth}
                                    user={st.user}
                                    {...match}/>
                            )
                        }/>
                    <Route path='/login'
                        exact
                        render={
                            (match) => (
                                <Login auth={st.auth}
                                    logUser={this.logUser.bind(this)}
                                    {...match}/>
                            )
                        }/>
                    <Route path='/reserva'
                        exact
                        render={
                            (match) => <Reserva {...match}/>
                        }/>
                </Router>
            </>
        );
    }
}

if (document.getElementById('app-container')) {
    ReactDOM.render(
        <AppRouting/>,
        document.getElementById('app-container')
    )
}
