import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../misc/Button';

function BarraNavegacion(props) {
    return (
        <div className="container border-bottom">
            <div className="row">
                <div className="col-sm-8">
                    <h4>
                        Nombre de usuario
                    </h4>
                </div>
                <div className="col-sm-4 no-padding">
                    <div className="container no-padding">
                        <div className="flex-row h-end">
                            <div>
                                <Button type="" onClick={props.func} class="btn btn-primary reduce-padding margin-box" icon="fas fa-bell" title="" />       
                            </div>
                            <div>
                                <Button type="" onClick={props.func} class="btn btn-danger reduce-padding margin-box" icon="fas fa-power-off" title="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(BarraNavegacion);
