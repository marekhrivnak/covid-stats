// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';
import React  from 'react';
import Moment from 'react-moment';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const MyResponsiveLine = ({data, vacc=false, population=0}) => {


        return(
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                xScale={{
                type: "time",
                precision: "hour",
                }}
                curve="cardinal"
                axisBottom={{
                format: "%b/%y",
                legendOffset: 36,
                legendPosition: 'middle',
                tickRotation: 90
                }}
                colors={{ scheme: 'set2' }}
                enableSlices="x"
                sliceTooltip={( {slice} ) => {
                    return (
                        <div style={{
                            border: "2px solid black",
                            borderRadius: "10px",
                            padding: "5px",
                            backgroundColor: "black",
                            opacity: 0.5,
                            color: "white"
                        }}>
                            <div><Moment format=" DD/MMM/YYYY">
                                        {" " + slice.points[0].data.xFormatted}
                                    </Moment></div>
                            {slice.points.map(point => (
                                <div
                                    key={point.id}
                                >            
                                    <strong>{point.serieId + ": "}</strong> 
                                    {vacc ? <div>{point.data.yFormatted} ({((point.data.yFormatted/ population)*100).toFixed(2)}%)</div> : <div>{point.data.yFormatted}</div> }
                                </div>
                            ))}
                        </div>
                    )
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
        />
        )
    }

export default MyResponsiveLine;