import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';
import {
    GET
} from '../../utils/api';
import {ExpandableComponent} from '../../hocs/ExpandableComponent';
import * as d3 from "d3";
import {
    getMonthLength
} from '../../utils/Helper';

function pullGraphic(){
    const dataset = this.state.data,
        w = 1000,
        h = 500,
        padding = 60,
        xScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[0])])
            .range([padding, w - padding]),
        yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([h - padding, padding]),
        svg = d3.select(this.graph.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy",(d) => yScale(d[1]))
        .attr("r", (d) => 5);

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) =>  (d[0] + "," + d[1]))
        .attr("x", (d) => xScale(d[0] + 10))
        .attr("y", (d) => yScale(d[1]))

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${(padding)},0)`)
        .call(yAxis);
}

export default class GraphicHolder extends Component {
    constructor (props){
        super(props);
        this.state={data:null};
        this.graph = React.createRef({});
        this.pull = pullGraphic.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({data:[
                  [ 34,     78 ],
                  [ 109,   280 ],
                  [ 310,   120 ],
                  [ 79,   411 ],
                  [ 420,   220 ],
                  [ 233,   145 ],
                  [ 333,   96 ],
                  [ 222,    333 ],
                  [ 78,    320 ],
                  [ 21,   123 ]
                ]})
        },1000)
    }

    render(){
        const state = this.state;
        if ( state.data )
            this.pull();

        return (
            <ExpandableComponent show={true}
                titulos={{mas:"Mostrar gráficos",menos:"Ocultar gráficos"}}>
                <div ref={this.graph}
                    className="v-padding"
                    style={{
                        marginTop:"10px",
                        backgroundColor:"var(--light-border)",
                        borderRadius:"5px"
                    }}>
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
            </ExpandableComponent>
        )
    }
}
