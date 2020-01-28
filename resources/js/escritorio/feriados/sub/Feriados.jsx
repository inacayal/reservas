/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import FeriadosTable from '../../../componentes/tables/FeriadosTable';
import DateFilter from '../../../hocs/DateFilter';
import FeriadoViews from '../../../componentes/agenda/FeriadoView';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-calendar-week inline-box side-margin" />
                Horarios
            </div>
        ),
        to:`/horarios`,
        params:{},
        route:`horarios`
    }
];

export default class Feriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            view:true
        };
    }

    componentDidMount() {
        console.log('mount')
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    changeView(){
        this.setState({view:!this.state.view})
    }

    render(){
        const   data = this.props.data,
                nav = this.props.nav.links.concat(links);
        return (
            <>
                <Titulo title="Feriados"
                    changeView ={{
                        right:"Ver tabla",
                        left:"Ver agenda",
                        change:this.changeView.bind(this),
                        side:this.state.view
                    }}
                    links={nav}/>
                <div className="container">
                {
                    this.state.view
                    ?
                        <DateFilter data={this.props.data}
                            controls={NO_DAY_CONTROL}
                            defaultView={"1"}>
                            <FeriadoViews actions={{eliminar:this.props.toggleModal}}/>
                        </DateFilter>
                    :
                        <FeriadosTable data={Object.values(data.data)}/>
                }
                </div>
            </>
        );
    }
}
