/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Text} from '../input/Text';
import {GET} from '../../utils/api';

const fieldNames = {
    reservas: 'nombre,apellido,email,telefono',
    horarios:'id_dia_semana',
    feriados:'nombre',
    ubicaciones:'nombre',
    eventos:'nombre',
    promociones:'nombre'
};

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            route:this.props.route.split('/')[1],
            focus:false,
            termFinished:false
        };
        this.request = this.request.bind(this);
    }

    request(term,route){
        const   field = fieldNames[route],
                request = GET({endpoint:`search/${term}/${route}/${field}/${user.id}`})
                    .then(response => {console.log(response)})
                    .catch(this.props.error);
    }

    changeSearch (e) {
        const term = e.target.value;
        this.setState(
            {term},
            () => setTimeout(
                () => {
                    if (term === this.state.term && term!== '')
                        this.request(this.state.term,this.state.route)
                },
                2000
            )
        )
    }

    toggleFocus(){
        this.setState({focus:!this.state.focus},()=>this.props.searchMode())
    }

    render (){
        const route = this.props.route.split('/')[1];
        return (
            <>
                <div    className="white-background border-box-no-padding full-width relative flex-row"
                        style={{borderRadius:"25px"}}>
                    <div className="select-title"  style={{overflow:"hidden"}}>
                        <input  type="text"
                                value={this.state.term}
                                placeholder={`buscar en ${route}`}
                                className="smaller-text inline-block h-padding"
                                onChange = {this.changeSearch.bind(this)}
                                onFocus={this.toggleFocus.bind(this)}
                                onBlur={this.toggleFocus.bind(this)}/>
                    </div>
                    <div className="margin-left h-padding v-align-center">
                        <i className="fas fa-search" style={{color:this.state.focus ? 'var(--light-danger)' : 'var(--border)'}}/>
                    </div>
                </div>
                <div className="visible relative" >
                    <div    className={
                                this.state.term === '' || !this.state.focus
                                    ? "hidden"
                                    : "full-width overlay"
                            }
                            style={{opacity:"1"}}>
                        <div className="arrow-up relative relative" style={{marginTop:"-4px"}}/>
                        <div className="white-background shadow-result box-padding round-border"
                             style={{maxHeight:'80vh'}}>
                            {this.state.term}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
