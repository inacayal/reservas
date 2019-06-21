import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Contenido from './contenedores/Contenido';
import Lateral from './contenedores/Lateral';
import Navegacion from './contenedores/Navegacion';

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Navegacion />
                </div>
                <div className="row">
                    <div className="col-md-3 no-padding">
                        <Lateral />
                    </div>
                    <div className="col-md-9">
                        <Contenido />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(<Main />, document.getElementById('escritorio-container'));
}
