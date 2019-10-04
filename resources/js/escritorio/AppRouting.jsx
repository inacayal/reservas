/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navegacion from './Navegacion';
/**
 * componentes
 */
import COMPONENTES from './Componentes'; 
//holds reservation state
export default class AppRouting extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="full-width container">
                <div className="row">
                    <Navegacion />
                </div>
                <Switch>
                    <Route
                        path='/'
                        exact
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.escritorio}
                                    current={'0'}
                                    {...props}/>
                        }/>
                    <Route 
                        path='/reservas' 
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.reservas} 
                                    current={'1'}
                                    {...props}/>
                        } />
                    <Route
                        path='/horarios'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.horarios} 
                                    current={'2'}
                                    {...props}/>
                            }
                        />
                    <Route
                        path='/ubicaciones'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.ubicaciones} 
                                    current={'3'}
                                    {...props}/>
                        } />
                    <Route
                        path='/eventos'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.eventos}
                                    current={'4'} 
                                    {...props}/>
                        } />
                    <Route
                        path='/promociones'
                        component={
                            (props) =>
                                <MainFrame
                                    render={COMPONENTES.promociones}
                                    current={'5'}
                                    {...props} />
                        } />
                    <Route
                        path='/locales'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.locales} 
                                    current={'6'}
                                    {...props}/>
                        } />
                    <Route
                        path='/configuracion'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.configuracion} 
                                    current={'7'}
                                    {...props}/>
                        } />
                    <Route
                        path='/franquicias'
                        component={
                            (props) => 
                                <MainFrame
                                    render={COMPONENTES.franquicias} 
                                    current={'8'}
                                    {...props}/>
                        } />
                </Switch>
            </div>
        );
    }
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(
    <Router basename="/escritorio">
        <AppRouting />
    </Router>
    , document.getElementById('escritorio-container'));
}
