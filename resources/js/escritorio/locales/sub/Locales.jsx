
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * sub elementos
 */
import VerLocal from './VerLocal';
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * nav
 */
import { Navegacion } from '../Navegacion';
import LocalesTable from './LocalesTable';

export default class Locales extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadFinished:false,
            data:null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData() {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: '/usuario/locales/5',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.locales.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    links(key) {
        return [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to: '/locales/' + key
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to: '/locales/editar/' + key
            }
        ];
    }

    render() {
        if (this.state.data && this.state.loadFinished){
            const
                columns = this.columns,
                data = Object.values(this.state.data).map(
                    e => ({
                        ...e,
                        acciones: <Actions links={this.links(e)} buttons={[]}/>
                    })
                ),
                nav = Navegacion.listado(data);
            return (
                <>
                    < Titulo
                        title="Locales"
                        links={nav.links} />
                    <div className="container no-padding">
                        <div className="row">
                            <LocalesTable data={data}/>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
