import React, {
    Component,
    useState
} from 'react';
import {
    withRouter
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';
import {
    GET
} from '../../utils/api';
import {ExpandableComponent} from '../../hocs/ExpandableComponent';
import {
    getMonthLength
} from '../../utils/Helper';
import * as d3 from "d3";
import Navigation from "../agenda/Navigation";
import {
    MONTHS,
    DAYS
} from "../../constantes/DaysMonths";

function getMax( data ){
    let curr,max=0;
    for ( let i=0; i<data.length; i++ ){
        max = data[i].reduce(
            (max,e) => e[1]>max ? e[1] : max ,max
        );
    }
    return max;
}

function pullMonthGraphic( {month,year,curves} ){
    const xWidth = getMonthLength(month,year),
        padding = 40,
        w = this.graph.current.clientWidth,
        h = this.graph.current.clientHeight,
        m = getMax( Object.values( this.state.data ) ),
        tw = 3,
        xScale = d3.scaleLinear()
            .domain([1, xWidth])
            .range([padding, w - padding]),
        yScale = d3.scaleLinear()
            .domain([0, m])
            .range([h - padding, padding]),
        svg = d3.select(this.graph.current)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${w} ${h}`)
            .attr("width", w)
            .attr("height", h),
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

    let valueline,g,tx,dataset,curvename;

    svg.append("g")
        .attr("transform", `translate(${padding},0)`)
        .attr("class", "axis-y" )
        .call(
            yAxis.ticks(m)
                .tickSize(-w)
                .tickSizeOuter(0)
        );

    svg.append("g")
        .attr("transform", `translate(0,${h-padding})`)
        .attr("class", "axis-x")
        .call(xAxis);

    svg.append("text")
        .attr("transform",`translate(${w/2},${h-padding/4})`)
        .style("font-weight", "bold")
        .text(`${MONTHS[month-1]} de ${year}`);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - h/2)
        .attr("dy", "1em")
        .style("font-weight", "bold")
        .text("Numero de reservas");

    for ( let i=0; i<curves.length; i++ ){

        dataset = this.state.data[ curves[i] ];

        curvename = curves[i].replace(/\ /gi,"-");

        valueline = d3.line()
            .x( d => xScale( d[0] ) )
            .y( d => yScale( d[1] ) );

        svg.append("path")
            .data([dataset])
            .attr("class", "line")
            .attr("d", valueline);

        svg.selectAll(`circle.circle.${curvename}-circle`)
            .data(dataset)
            .enter()
            .append("circle")
            .attr("curvename",curvename)
            .attr("class", `circle ${curvename}-circle`)
            .attr("cx", (d) => xScale(d[0]))
            .attr("cy",(d) => yScale(d[1]))
            .attr("r", (d) => 5);
    }

    for ( let i=0; i<curves.length; i++ ){

        dataset = this.state.data[ curves[i] ];

        curvename = curves[i].replace(/\ /gi,"-");

        g = svg.selectAll(`g.tip.${curvename}-tip`)
            .data(dataset)
            .enter()
            .append("g")
            .style("visibility", "hidden")
            .attr("class",d => `${curvename}-tip-${d[0]}`)
            .attr("transform",(d) => `translate(${d[0]<25 ? xScale(d[0])+10 : xScale(d[0]-tw)-10},${yScale(d[1])-25})`);

        g.append("rect")
            .attr("rx", 5)
            .attr("ry",5)
            .attr("class","rect")
            .attr("width",xScale(tw))
            .attr("height", 70);

        g.append("text")
            .attr("font-size", 15)
            .attr("transform",`translate(10,20)`)
            .attr("fill","var(--text)")
            .attr("font-weight","bold")
            .text(curves[i]);

        g.append("text")
            .attr("font-size", 13)
            .attr("transform",`translate(10,36)`)
            .attr("fill","var(--text)")
            .text( (d) =>
                `${DAYS[(new Date(`${year}-${month}-${d[0]}`)).getDay()]} ${d[0]}`
            )
            .attr("font-weight","bold")

        g.append("text")
            .attr("font-size", 13)
            .attr("transform",`translate(10,51)`)
            .attr("fill","var(--text)")
            .text( (d) =>
                `${DAYS[(new Date(`${year}-${month}-${d[0]}`)).getDay()]} ${d[0]}: `
            )
            .text( (d) =>  `${d[1]} Reservas` )
            .attr("font-weight","normal");

        svg.selectAll(`circle.${curvename}-circle`)
            .on("mouseover", el => {
                const curve = d3.event.currentTarget.getAttribute("curvename");
                svg.select(`g.${curve}-tip-${el[0]}`).style("visibility", "visible");
            })
            .on("mouseout", el => {
                const curve = d3.event.currentTarget.getAttribute("curvename");
                svg.select(`.${curve}-tip-${el[0]}`).style("visibility", "hidden");
            });
    }
}

class GraphicHolder extends Component {
    constructor (props){
        super(props);
        this.state={data:null};
        this.graph = React.createRef(null);
        this.pullMonthGraphic = pullMonthGraphic.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.queryData = this.queryData.bind(this);
    }

    changeDate(date){
        new Promise(
            function (solve, rej) {
                const p = this.props;
                p.history.replace({
                    state:{
                        ...p.location.state,
                        date
                    }
                });
                solve( date );
            }.bind(this)
        ).then(this.queryData)
    }

    queryData(date){
        GET({
            endpoint: this.props.monthly
                .replace("$month",date.getMonth()+1)
                .replace("$year",date.getFullYear())
        })
        .then ( res => {
            d3.select(this.graph.current)
                .selectAll("svg")
                .remove();
            this.setState({data:res.data});
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        const props = this.props,
            loc = props.location.state;
        this.queryData( (loc||{}).date||new Date() )
    }

    changeMonth(e){
        const loc = this.props.location.state,
            date = (loc||{}).date||new Date();
        e.preventDefault();
        date.setMonth(parseInt(e.currentTarget.getAttribute('value')))
        this.changeDate( new Date(date) );
    }

    changeYear(e) {
        const loc = this.props.location.state,
            date = (loc||{}).date||new Date();
        e.preventDefault();
        date.setFullYear(parseInt(e.currentTarget.getAttribute('value')));
        this.changeDate( new Date(date) );
    }

    render(){
        const state = this.state,
            props = this.props,
            loc = props.location.state||{},
            date = (loc||{}).date||new Date();

        let curves = [];

        if ( state.data ) {
            curves = Object.keys(state.data);
            this.pullMonthGraphic({
                month:date.getMonth()+1,
                year: date.getFullYear(),
                curves
            });
        }

        return (
            <>
                {
                    !props.receivesDate
                    ?
                        <Navigation date={date}
                            changeMonth={this.changeMonth.bind(this)}
                            changeYear={this.changeYear.bind(this)}
                            hideSearch
                            hideDate
                            fromGraphic
                            hide/>
                    :
                    <></>
                }
                <ExpandableComponent show={true}
                    alignEnd
                    title={
                        <div className="container-fluid no-padding">
                            <h5 className="text-left bold" style={{margin:"5px 0 0 0"}}>
                                {props.titulo}
                            </h5>
                        </div>
                    }
                    titulos={{mas:"Mostrar",menos:"Ocultar"}}>

                    <div className="col-md-12 no-padding">
                        <div className="container-fluid no-padding row">
                            <div className="col-md-2 text-left no-padding">
                                <div className=" extra-box-padding"
                                    style={{borderRadius:"5px",backgroundColor:"rgb(222, 226, 230)"}}>
                                    <h5 className="bold">
                                        Análisis Mensual
                                    </h5>
                                    <ul>
                                    {
                                        curves.map(
                                            (e,i) => (
                                                <li key={i}>{e}</li>
                                            )
                                        )
                                    }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-10 container-fluid">

                                <div ref={this.graph}
                                    className="row h-padding"
                                    style={{minHeight:"50vh"}}>
                                {
                                    state.data
                                    ?
                                        <></>
                                    :
                                        <div className="text-center">
                                            <div className="inline-block">
                                            <Loader type="TailSpin"
                                                color="gray"
                                                secondaryColor="gray"
                                                height={70}
                                                width={70}
                                                timeout={2000}/>
                                            </div>
                                        </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </ExpandableComponent>
            </>
        )
    }
}

export default withRouter( GraphicHolder );
