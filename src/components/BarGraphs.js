import React, {Component} from 'react';
import { ResponsiveBar } from '@nivo/bar';


class BarGraphs extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          graph_data: []
        };
      }



      componentDidMount() {
        fetch("https://corona-api.com/countries")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
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

        var all_countries = [];
        var top20 = [];
        var i = 0, j=0;
        this.state.graph_data.map(item => {
            var deathspermil = Math.floor((item.latest_data.deaths)/(item.population/1000000));
            all_countries.push({"country": item.name, deaths: deathspermil});
            return(null);
        });
        for (j = 0; j < 15; j++ ){
            var name_country = "";
            var index = 0;
            var max_value = 0;
            for (i = 0; i < all_countries.length; i++ ){
                if (max_value < all_countries[i].deaths){
                    max_value = all_countries[i].deaths;
                    name_country = all_countries[i].country;
                    index = i;
                }
            }
            all_countries.splice(index,1);
            top20.push({"country": name_country, deaths: max_value})
        }

        return(
            <ResponsiveBar
                    data={top20}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'set2' }}
                    keys={["deaths"]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 25,
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 2.5 ] ] }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
        )
      }


    }

    export default BarGraphs;