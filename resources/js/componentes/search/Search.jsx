/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Text} from '../input/Text';
import {GET} from '../../utils/api';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

const findOccur = (regex,str) =>
    str.replace(regex, x => `<>${x}<>`)
        .split('<>')
        .map(
            (e,i) =>
                e.search(regex)!==-1
                    ? <span key={i} className="highlight-title">{e}</span>
                    : e
        );

const filterData = (regex,data,route) =>
    data.reduce(
        (t,c) => (
            (
                fields[route].filter(
                    e => c[e].match(regex)
                )||[]
            ).length>0
                ? [...t,c]
                : t
        ),
        []
    );

const fields = {
    reservas: ['nombre','apellido','dni'],
    feriados:['nombre'],
    ubicaciones:['nombre'],
    eventos:['nombre'],
    promociones:['nombre']
};

const prettyData = {
    reservas:(data,term) =>
        data.map(
            (e,i) => {
                const   reg = term
                            ? new RegExp(`${term}+`,'gi')
                            : null,
                        title = reg
                            ? [findOccur(reg,e.nombre),', ',findOccur(reg,e.apellido)]
                            : [e.nombre,', ',e.apellido]
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`eventos/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">
                                <span className="bold light-danger">{reg ? findOccur(reg,e.dni) : e.dni}</span>
                            </div>
                            <div className="text smaller-text">
                                <div>
                                    <span className="bold">email:</span>
                                    <span>{e.email},</span>
                                </div>
                                <div>
                                    <span className="bold">teléfono:</span>
                                    <span>{e.telefono}</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }
        ),
    feriados:(data,term) =>
        data.map(
            (e,i) => {
                const title = term
                    ? findOccur(new RegExp(`${term}+`,'gi'),e.nombre)
                    : e.nombre,
                    fecha = new Date(e.fecha)
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`eventos/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">
                                <span className="bold light-danger">{`${fecha.getDay()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`}</span>
                                <span>{e.descripcion}</span>
                            </div>
                        </Link>
                    </li>
                )
            }
        ),
    ubicaciones:(data,term) =>
        data.map(
            (e,i) => {
                const title = term
                    ? findOccur(new RegExp(`${term}+`,'gi'),e.nombre)
                    : e.nombre
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`eventos/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">{e.descripcion}</div>
                        </Link>
                    </li>
                )
            }
        ),
    eventos:(data,term) =>
        data.map(
            (e,i) => {
                const title = term
                    ? findOccur(new RegExp(`${term}+`,'gi'),e.nombre)
                    : e.nombre
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`eventos/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">{e.descripcion}</div>
                        </Link>
                    </li>
                )
            }
        ),
    promociones:(data,term) =>
        data.map(
            (e,i) => {
                const title = term
                    ? findOccur(new RegExp(`${term}+`,'gi'),e.nombre)
                    : e.nombre
                return (
                    <li key={i} className="box-padding search-result">
                        <Link to={`eventos/${e.id}`}>
                            <div className="smaller-text text bold" style={{wordBreak: 'break-all'}}>
                                {title}
                            </div>
                            <div className="smaller-text text">{e.descripcion}</div>
                        </Link>
                    </li>
                )
            }
        )
};

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            route:this.props.route.split('/')[1],
            focus:false,
            termFinished:false,
            results:[]
        };
        this.requestData = this.requestData.bind(this);
    }

    requestData(term,route){
        const   request =   GET({
                                endpoint:`search/${route}/${user.id}`
                            })
                            .then(
                                response => {
                                    const results = (route === this.state.route && this.state.focus)
                                        ? response.data.data
                                        : []
                                    this.setState({results})
                                }
                            )
                            .catch(this.props.error);
    }

    shouldComponentUpdate(np,ns){
        return this.props.route !== np.route
            || ns.term !== this.state.term
            || ns.results !== this.state.results
            || ns.focus !== this.state.focus
    }

    componentDidMount(){
        const searchState = (this.props.location.state||{}).search;
        if (searchState||{}.term) {
            this.setState({term:searchState.term})
        }
    }

    componentDidUpdate(pp,ps){
        const searchState = (this.props.location.state||{}).search;
        if (this.props.route !== pp.route){
            const term  = searchState||{}.term
            ? searchState.term
            : '';
            this.setState({term,route:this.props.route.split('/')[1]});
        }
        if (this.state.focus !== ps.focus && this.state.focus){
            this.requestData(this.state.term,this.state.route);
        } else if (!this.state.focus){
            this.props.history.replace({
                state: {
                    ...this.props.location.state||{},
                    search:{term:this.state.term}
                }
            })
        }
    }

    changeSearch (e) {
        const term = e.target.value;
        this.setState({term})
    }

    toggleFocus(){
        this.setState(
            {focus:!this.state.focus},
            ()=>this.props.searchMode()
        )
    }

    render (){
        const   data = this.state.results,
                term = this.state.term,
                route = this.state.route,
                filter = (term)
                    ? filterData(new RegExp(`${term}+`,'gi'),data,route)
                    : data;
        return (
            <>
                <div className="white-background search-box full-width relative flex-row align-center">
                    <div className="select-title"  style={{overflow:"hidden"}}>
                        <input  type="text"
                                value={this.state.term}
                                placeholder={`buscar en ${this.props.route.split('/')[1]}`}
                                className="smaller-text inline-block h-padding"
                                onChange = {this.changeSearch.bind(this)}
                                onFocus={this.toggleFocus.bind(this)}
                                onBlur={this.toggleFocus.bind(this)}/>
                    </div>
                    <div className="margin-left h-padding v-align-center">
                        <i className="fas fa-search" style={{color:this.state.focus ? 'var(--light-danger)' : 'var(--border)'}}/>
                    </div>
                </div>
                <div className="visible relative" style={{zIndex:'10'}}>
                    <div    className={
                                this.state.term === '' || !this.state.focus
                                    ? "hidden"
                                    : "full-width overlay"
                            }
                            style={{opacity:"1"}}>
                        <div className="arrow-up relative relative" style={{marginTop:"-4px"}}/>
                        <div className="white-background shadow-result round-border"
                             style={{maxHeight:'80vh',overflowX:'hidden',overflowY:'auto'}}>
                            {
                                filter.length>0
                                    ? <ul className="nav-list no-padding">{prettyData[route](filter,term)}</ul>
                                    : <div className="box-padding">sin resultados</div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(Search);
