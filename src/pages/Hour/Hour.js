import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';


function Hour() {
    const [modifiedData, setModifiedData] = useState([])
    const day = localStorage.getItem("day");
    const location = useLocation();
    const data = location.state.data;

    useEffect(() => {
        if (data !== []) {
            const graphdata = [];
            data.forEach((d) => {
                const datetime = d.dt_txt.split(" ");
                if (datetime[0] == day) {
                    const time = datetime[1].slice(0, 2);
                    const temp = d.main.temp - 273.15;
                    graphdata.push({ time, temp })
                }
            });
            if (graphdata.length === 16){
                graphdata.slice(9,16);
            }
            setModifiedData(graphdata);
        }
    }, [day])


    return (
        <>
            <h1>Hourly Forecast</h1>
            <h4>{day}</h4>
            {modifiedData.length === 0  ? <h3>Loading...</h3>:
            <AreaChart
                width={1400}
                height={400}
                data={modifiedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"time"} />
                <YAxis />
                <Tooltip labelFormatter={(d) => "Time: " + d + " Hrs"} formatter={(t) => ["Temperature: " + new Intl.NumberFormat('en').format(t), undefined]} />
                <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#ffffff" />
            </AreaChart>}
        </>
    );
}

export default Hour;