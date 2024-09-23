import React, {Component} from 'react';
import virus from '../images/virus.png';
import cured from '../images/cured.png';
import grave from '../images/grave.png';
import plus from '../images/plus.png';
import confirm from '../images/confirm.png';
import './InfoBars.css'
import MyResponsiveLine from "./LineGraph";
import BarGraphs from './BarGraphs';
import NumberFormat from 'react-number-format';


class InfoBars extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          acutal_data: [],
          graph_data: []
        };
      }


      componentDidMount() {
        fetch("https://corona-api.com/timeline")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                acutal_data: result.data[0], 
                graph_data: result.data
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }


    
    

      render(){
          const today_data = this.state.acutal_data;
          var json_graph_data = [{id: "deaths", data:[]}, {id: "recovered", data:[]}, {id: "confirmed", data:[]}];
          var new_data = [{id: "deaths", data:[]}, {id: "recovered", data:[]}, {id: "confirmed", data:[]}];
          var deaths_data = [{id: "deaths", data:[]}]
          var weekavgD = 0, weekavgC = 0, weekavgR = 0;
          var newD = 0, newC = 0, newR = 0;
          var counter = 0;
          this.state.graph_data.slice(0).reverse().map(item => {
              counter++;
              weekavgD += item.deaths;
              weekavgC += item.confirmed;
              weekavgR += item.recovered;
              newD += item.new_deaths;
              newC += item.new_confirmed;
              newR += item.new_recovered;
              if (counter === 7){
                json_graph_data[0].data.push({x: new Date (item.date), y: Math.floor(weekavgD/7)});
                json_graph_data[1].data.push({x: new Date (item.date), y: Math.floor(weekavgR/7)});
                json_graph_data[2].data.push({x: new Date (item.date), y: Math.floor(weekavgC/7)});
                new_data[0].data.push({x: new Date (item.date), y: Math.floor(newD/7)});
                new_data[1].data.push({x: new Date (item.date), y: Math.floor(newR/7)});
                new_data[2].data.push({x: new Date (item.date), y: Math.floor(newC/7)});
                deaths_data[0].data.push({x: new Date (item.date), y: Math.floor(newD/7)});
                counter = 0;
                weekavgD = 0;
                weekavgC = 0;
                weekavgR = 0;
                newD = 0;
                newC = 0;
                newR = 0;
              }
              return(null);
          }); 
          return(
	<div id="cases">
            <div className="allbars">
              <div className="heading"><h1>CORONAVIRUS CASES:</h1></div>
              <div className="bars">

                  <div id="bar1" className="bar">
                  <p>
                  <img src={virus} alt="virus"/>
                  </p>
                  <p>Active</p>
                  <p className="p_bar"><NumberFormat value={today_data.active} displayType={'text'} thousandSeparator={" "} /></p>
              </div>
              <div id="bar4" className="bar">
                <p>
                    <img src={plus} alt="plus"/>
                </p>
                <p>New cases</p>
                <p className="p_bar" > <NumberFormat value={today_data.new_confirmed} displayType={'text'} thousandSeparator={" "} /> </p>
              </div>
              <div id="bar2" className="bar">
                 <p>
                    <img src={confirm} alt="confirmed"/>
                  </p>
                  <p>Confirmed</p>
                  <p className="p_bar" ><NumberFormat value={today_data.confirmed} displayType={'text'} thousandSeparator={" "} /> </p>
              </div>
              <div id="bar3" className="bar">
                <p>
                    <img src={cured} alt="cured"/>
                </p>
                <p>Recovered</p>
                <p className="p_bar" ><NumberFormat value={today_data.recovered} displayType={'text'} thousandSeparator={" "} /> </p>
              </div>
              <div id="bar5" className="bar">
                <p>
                    <img src={grave} alt="grave"/>
                </p>
                <p>Deaths</p>
                <p className="p_bar" ><NumberFormat value={today_data.deaths} displayType={'text'} thousandSeparator={" "} /> </p>
	<div id="graphs"> </div>              
	</div>
              </div>
              <h1>COVID IN GRAPHS</h1>
              <div className="graphs">
              
                <div className="graph" style={{ height: 500, width: "100%" }}>
                  <h2>Cumulative numbers of confirmed cases, recovered and deaths</h2>
                  {json_graph_data != null ? 
                     json_graph_data[0].data.length > 0 ?
                    <MyResponsiveLine data={json_graph_data} /> 
                    : <div>Loading..</div> 
                  : <div>Loading..</div>}
                </div>
                <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
                <div className="graph" style={{ height: 500, width: "100%" }}>
                  <h2>Daily confirmed cases, recovered and deaths</h2>
                    {new_data != null ? 
                      new_data[0].data.length > 0 ?
                      <MyResponsiveLine data={new_data} /> 
                      : <div>Loading..</div> 
                    : <div>Loading..</div>}
                </div>
                <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
                <div className="graph" style={{ height: 500, width: "100%" }}>
                  <h2>Confirmed deaths</h2>
                  {deaths_data != null ? 
                      deaths_data[0].data.length > 0 ?
                      <MyResponsiveLine data={deaths_data} /> 
                      : <div>Loading..</div> 
                    : <div>Loading..</div>}
                </div>
                <div className="graph" style={{ height: 500, width: "100%" }}>
                  <h2>Deaths per milion people</h2>
                     <BarGraphs/> 
                </div>
              </div>
              </div>
              </div>
          );
      }

}

export default InfoBars;
