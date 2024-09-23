import React, {Component} from 'react';
import MyResponsiveChoropleth from './components/worldmap';
import './WelcomeScreen.css';
import { BasicTable } from './components/BasicTable';
import InfoBars from './components/InfoBars';


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      acutalClicked: 1,
      countries: [],
    };
  }


  clickHandler(id) {
    var oldStr = "choropleth"  + this.state.acutalClicked.toString();
    var newStr = "choropleth"  + id.toString();
    var oldx = document.getElementById(oldStr);
    var newx = document.getElementById(newStr);
    oldx.style.display = "none";
    newx.style.display = "block";
    var btn1 = document.getElementById("btn"+id.toString());
    var btn2 = document.getElementById("btn"+this.state.acutalClicked.toString());
    btn1.style.pointerEvents = 'none';
    btn1.style.textDecoration = 'underline';
    btn2.style.pointerEvents = 'auto';
    btn2.style.textDecoration = 'none';
    this.setState({acutalClicked: id});
  }

  toggleMap(id){
    var newdiv;
    var olddiv;
    if (id === 1){
      newdiv = document.getElementById("map");
      olddiv = document.getElementById("table");
      olddiv.style.display = "none";
      newdiv.style.display = "block";
    }
    else {
      newdiv = document.getElementById("table");
      olddiv = document.getElementById("map");
      olddiv.style.display = "none";
      newdiv.style.display = "block";
    }
  }


  componentDidMount() {
    fetch("https://corona-api.com/countries")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            countries: result.data, 
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


  render() {
    const myData = [];
    const dataPerCapita = [];
    const tableData = [];



    this.state.countries.map(item => {
      myData.push({id : item.code, value: (item.latest_data.confirmed)/(item.population/1000000)});
      dataPerCapita.push({id : item.code, value: (item.latest_data.deaths)/(item.population/1000000)});
      tableData.push({id: item.code, name: item.name, confirmed: item.latest_data.confirmed, recovered: item.latest_data.recovered, critical: item.latest_data.critical, deaths: item.latest_data.deaths});
      return(null);
    });

    const upperLimit = 100000;
    const upperLimitCapita = 2000;
    return (
      <div className="tabsDiv" >
            <div className="tableSelector" >
              <button id="btn3" className="c_type" onClick={ () => this.toggleMap(1)}>World map</button>
              <button id="btn4" className="c_type" onClick={ () => this.toggleMap(2)}>Table</button>
            </div>
            <div id="table" style={{overflow: "auto", height: "700px"}}>
              <BasicTable my_covid_data={tableData}  />
            </div>
            <div id="map">
            <div className="select_buttons">
              <button id="btn1" href="#" className="c_cases" onClick={ () => this.clickHandler(1)}>Cases per milion  </button>
              <button id="btn2" href="#" className="c_deaths" onClick={ () => this.clickHandler(2)}>Deaths per million </button>
            </div>
              <div className="choropleth" id="choropleth1" style={{ height: "700px", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto", paddingTop: "50px", backgroundColor: "#ededed" }}>
                <MyResponsiveChoropleth data={myData}  upperLimit={upperLimit} />
              </div>

              <div className="choropleth1" id="choropleth2" style={{ height: "700px", width: "100%", display: "none", marginLeft: "auto", marginRight: "auto", paddingTop: "50px", backgroundColor: "#ededed" }}>
                <MyResponsiveChoropleth data={dataPerCapita} upperLimit={upperLimitCapita}  />
              </div>
            </div>

            <InfoBars/>

      </div>

    );
  }
  }





export default WelcomeScreen;