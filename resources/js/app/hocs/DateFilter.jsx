import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    withRouter
} from 'react-router';
import {
    WaitsLoading
} from './DataHandler';
import Navigation from '../componentes/agenda/Navigation';

class DateFilter extends Component {
    constructor(props){
        super(props);
        this.performChanges = this.performChanges.bind(this);
        this.state={
            date:this.props.data.date
        };
    }

    static contextType = WaitsLoading;

    changeView(e){
        this.props.history.replace({
            state:{
                ...this.props.location.state,
                show:e.currentTarget.getAttribute('data')
            }
        });
    }

    performChanges(date,avoidGet){
        this.setState(
            {date},
            () => {
                if ( !avoidGet )
                    this.context({date:new Date(date)});
            }
        );
    }

    changeDate(e){
        e.preventDefault();
        const nw = new Date(this.props.data.date);
        nw.setDate(parseInt(e.currentTarget.getAttribute('value')));
        this.performChanges(nw,true);
    }

    changeMonth(e){
        e.preventDefault();
        const date = new Date(this.props.data.date);
        date.setMonth(parseInt(e.currentTarget.getAttribute('value')))
        this.performChanges(date,false);
    }

    changeYear(e) {
        e.preventDefault();
        const date = new Date(this.props.data.date);
        date.setFullYear(parseInt(e.currentTarget.getAttribute('value')));
        this.performChanges(date,false);
    }

    render(){
        const props = this.props,
            date = new Date( this.state.date ),
            location = (props.location||{}).state||{};
        const dateNum = date.getDate();
        return(
            <>
                <Navigation date={date}
                    changeMonth={this.changeMonth.bind(this)}
                    changeYear={this.changeYear.bind(this)}
                    changeView={this.changeView.bind(this)}
                    changeDate={this.changeDate.bind(this)}
                    route={props.route}
                    controls={Object.values(props.controls)}
                    show={location.show||props.defaultView}
                    hide={props.hideViews}
                    hideSearch={props.hideSearch}/>
                <div className="row extra-h-padding">
                    {
                        React.cloneElement(
                            this.props.children,
                            {
                                show:location.show||props.defaultView,
                                date:date,
                                data:props.data
                            }
                        )
                    }
                </div>
            </>
        );
    }
}

export default withRouter(DateFilter);
