
import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from "../world_countries.json";


class MyResponsiveChoropleth extends React.Component {

    clickHandler = (redirectData) => {
        console.log(redirectData.id);
        window.location.href='/country/'+redirectData.id;
    }

    constructor(props) {
        super(props);
        this.state = {
          error: null,
        };
      }

    render(){
    return (
    <ResponsiveChoropleth
        data={this.props.data}
        features={countries.features}
        margin={{ top: -50, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, this.props.upperLimit ]}
        unknownColor="#666666"
        label="properties.name"
        value='value'
        valueFormat=".2s"
        projectionScale={170}
        onClick={(data, event) => this.clickHandler(data)}
        projectionTranslation={[ 0.5, 0.6 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={1}
        borderColor="#152538"
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 50,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )}
}
export default MyResponsiveChoropleth;
