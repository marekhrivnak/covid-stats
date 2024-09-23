import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './Country.css'
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import MyResponsiveLine from "./LineGraph";
import {countries} from 'country-data';
import Papa from 'papaparse'



function useFetch(url) {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((result) => {
            setResponse(result.data)
            setLoading(false)
        })
            .catch(() => {
                setHasError(true)
                setLoading(false)
            })
    }, [url])
    return [ response, loading, hasError ]
}

function useFetchCSV(url){
    const [rows, setRows] = useState([])
    var error = false;
    useEffect(() => {
    async function getData() {
        const response = await fetch(url).catch(() => {
            error = true;
        })
        if (!error){
        const reader = response.body.getReader()
        const result = await reader.read() // raw array
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
        const rows = results.data // array of objects
        setRows(rows)
        }
      }
      getData()
}, [url]) 
    return [rows]
}

function getData(data){
    var json_graph_data = [{id: "deaths", data:[]}, {id: "recovered", data:[]}, {id: "confirmed", data:[]}];
    var new_data = [{id: "deaths", data:[]}, {id: "recovered", data:[]}, {id: "confirmed", data:[]}];
    var deaths_data = [{id: "deaths", data:[]}]
    var active_data = [{id: "active cases", data:[]}]
    var weekavgD = 0, weekavgC = 0, weekavgR = 0;
    var newD = 0, newC = 0, newR = 0;
    var counter = 0;
    data.timeline.slice(0).reverse().map(item => {
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
          active_data[0].data.push({x: new Date (item.date), y: item.active});
          counter = 0;
          weekavgD = 0;
          weekavgC = 0;
          weekavgR = 0;
          newD = 0;
          newC = 0;
          newR = 0;
        }
        return (null);
    }); 
    return [new_data, json_graph_data, deaths_data, active_data]
}


function getVaccinationData(data){
    var new_data = [{id: "First dose", data:[]}, {id: "Fully vaccinated", data:[]},];
    data.map(item => {
        if (item.people_fully_vaccinated != null && !isNaN(parseInt(item.people_vaccinated)) && !isNaN(parseInt(item.people_fully_vaccinated)) ){
            new_data[0].data.push({x: new Date (item.date), y: parseInt(item.people_vaccinated)});
            new_data[1].data.push({x: new Date (item.date), y: parseInt(item.people_fully_vaccinated)});
            if (isNaN(parseInt(item.people_vaccinated))){
                console.log((parseInt(item.people_vaccinated)));
            }
            if (isNaN(parseInt(item.people_fully_vaccinated))){
                console.log(parseInt(item.people_fully_vaccinated));
            }
        }
        return (null);
    });
    return new_data;
}

export default function Country() {

        let { id } = useParams();
        
        const [response, loading, hasError] = useFetch("https://corona-api.com/countries/"+id);
        let country_name = id == 'CZ' ? "Czechia" : countries[id].name
        const [rows] = useFetchCSV("https://covid.ourworldindata.org/data/vaccinations/country_data/"+country_name+".csv");
        let vaccLoad = true, isActive = true;

        let newData, cumulativeData, deathsData, activeData, vacData = null;
        if (!loading){
            [newData, cumulativeData, deathsData, activeData] = getData(response);
        }
        if (rows.length !== 0){
            vacData = getVaccinationData(rows);
        }
        if (vacData != null){
            vaccLoad = false;
        }
        if (response != null ){
            if (response.timeline.length > 0){
                isActive = false;
            }
        }


        const imageurl = "https://flagcdn.com/h120/"+id.toLowerCase()+".png";
        return (
            <>
                {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> : 
                (<div> 
                    <div className="title">
                        <h1>Coronavirus in {response.name} </h1>
                                                <p>
                        Last update:  
                        <Moment format=" DD/MMMM/YYYY  hh:mm">
                            {" " + response.updated_at}
                        </Moment>&nbsp;(
                        <Moment fromNow>
                            {" " + response.updated_at}
                        </Moment>)
                        </p>
                        <p><img className="countryFlag" alt="" src={imageurl}></img></p>

                    </div>

                    <div className="infosquares">
                        <div className="square">
                            Deaths 
                            <div className="sqare_body">
                                <p><NumberFormat value={response.latest_data.deaths} displayType={'text'} thousandSeparator={" "} /></p>
                                <p className="rate">({Math.round(response.latest_data.calculated.death_rate*100)/100}%)</p>
                            </div>
                        </div>
                        <div className="square">
                            Confirmed Cases 
                            <p className="sqare_body"><NumberFormat value={response.latest_data.confirmed} displayType={'text'} thousandSeparator={" "} /></p>
                        </div>
                        <div className="square">
                            Recovered 
                            <div className="sqare_body">
                            <p><NumberFormat value={response.latest_data.recovered} displayType={'text'} thousandSeparator={" "} /></p>
                            <p className="rate">({Math.round(response.latest_data.calculated.recovery_rate*100)/100}%)</p>
                            </div>
                        </div>
                        <div className="square">
                            Critical 
                            <p className="sqare_body"><NumberFormat value={response.latest_data.critical} displayType={'text'} thousandSeparator={" "} /></p>
                        </div>
                        <div className="square">
                            Today Deaths 
                            <p className="sqare_body"><NumberFormat value={response.today.deaths} displayType={'text'} thousandSeparator={" "} /></p>
                        </div>
                        <div className="square">
                            Today confirmed 
                            <p className="sqare_body"><NumberFormat value={response.today.confirmed} displayType={'text'} thousandSeparator={" "} /></p>
                        </div>
                        <div className="square">
                            Active cases
                            {isActive ? <div>unavailable</div>
                            : <p className="sqare_body"><NumberFormat value={response.timeline[0].active}displayType={'text'} thousandSeparator={" "} /></p>
                            }
                        </div>
                        <div className="square">
                            Deaths per milion
                            <p className="sqare_body"><NumberFormat value={response.latest_data.calculated.cases_per_million_population} displayType={'text'} thousandSeparator={" "} /></p>
                        </div>
                        <div className="square_vacc">
                            Vaccination
                            {vaccLoad ? <div>Loading...</div> : 
                            vacData[0].data[vacData[0].data.length-1] == null ? <div className="unavailable">This country is not providing statistics about Vaccination</div> :
                            <div>
                                <div className="sqare_body_vac">
                                    First dose: &nbsp;
                                    <p><NumberFormat value={vacData[0].data[vacData[0].data.length-1].y} displayType={'text'} thousandSeparator={" "} />  ({((vacData[0].data[vacData[0].data.length-1].y / response.population)*100).toFixed(2)}%)</p>
                                </div>
                                <div className="sqare_body_vac">
                                    Second dose: &nbsp;
                                    <p> <NumberFormat value={vacData[1].data[vacData[1].data.length-1].y} displayType={'text'} thousandSeparator={" "} /> ({((vacData[1].data[vacData[0].data.length-1].y / response.population)*100).toFixed(2)}%)</p>
                                </div>
                            </div>

                            }
                        </div>

                    </div>

                    <div className="graphs">
                        <div className="graph" style={{ height: 550, width: "100%" }}>
                            <h1>Cumulative numbers: confirmed cases, deaths, recovered</h1>
                            {cumulativeData != null ? 
                                cumulativeData[0].data.length > 0 ?
                                <MyResponsiveLine data={cumulativeData} /> 
                                : <div>Unavailable..</div> 
                                : <div>Unavailable..</div>}
                        </div>
                        <div className="graph" style={{ height: 550, width: "100%" }}>
                            <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
<h2> &nbsp;</h2>
<h1>Actual numbers: confirmed cases, deaths, recovered</h1>
                            {newData != null ? 
                                newData[0].data.length > 0 ?
                                <MyResponsiveLine data={newData} /> 
                                : <div>Unavailable..</div> 
                                : <div>Unavailable..</div>}
                        </div>
                     
		
                        <div className="graph" style={{ height: 550, width: "100%" }}>
                            <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
<h2> &nbsp;</h2>
                            <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>	
<h1>Daily deaths</h1>
                            {deathsData != null ? 
                                deathsData[0].data.length > 0 ?
                                <MyResponsiveLine data={deathsData} /> 
                                : <div>Unavailable..</div> 
                                : <div>Unavailable..</div>}
                        </div>
                        

                        <div className="graph" style={{ height: 550, width: "100%" }}>
                            <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
<h2> &nbsp;</h2>
<h2> &nbsp;</h2>
<h2> &nbsp;</h2>	
<h1>Active cases</h1>
                            {activeData != null ? 
                                activeData[0].data.length > 0 ?
                                <MyResponsiveLine data={activeData} /> 
                                : <div>Unavailable..</div>
                                : <div>Unavailable..</div>}
                        </div>
                        {vaccLoad ? <div>Loading...</div> : 
                        (
                        

                        <div className="graph" style={{ height: 550, width: "100%" }}>
                            <h2> &nbsp;</h2>
                <h2> &nbsp;</h2>
<h2> &nbsp;</h2>
<h2> &nbsp;</h2>
<h2> &nbsp;</h2>			
<h1>Vaccination</h1>
                            {vacData != null ? 
                                vacData[0].data.length > 0 ?
                                <MyResponsiveLine data={vacData} /> 
                                : <div>This country is not providing statistics about Vaccination</div>
                                : <div>This country is not providing statistics about Vaccination</div>}
                        </div>)}
	

                    </div> 
                    
                    
                    
                
                </div>))}
            </>
        )
    }
