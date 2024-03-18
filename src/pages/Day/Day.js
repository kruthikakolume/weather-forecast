import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Button } from 'react-bootstrap';
import './Day.css';
import axios from 'axios'

function Day() {
    const navigate = useNavigate();
    const [hourly, setHourly] = useState(false);
    const [datas, setData] = useState({});
    const [flag, setFlag] = useState(false);

    if (flag === false){
        axios({
            method: "get",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=boston&appid=0689be962e588bdcde7b7a2ee0833c79",
        }).then(function (response) {
            setData(response.data);
            setFlag(true);
        });
    }
    
    useEffect(() => {
        if (hourly === true) {
            const day = localStorage.getItem("day")
            return navigate(`./${day}`,{state:{data: datas.list}});
        }
    }, [hourly]);

    const hourlyData = (day) => {
        setHourly(true);
        localStorage.setItem("day", day)
    }

    return (
        <>
            <h1>WEATHER FORECAST</h1>
            <div class="container">
                <Container>
                    {datas != {} ? 
                    datas?.list?.map(day => {
                        const datetime = day.dt_txt.split(" ");
                        if (datetime[1] === "12:00:00") {
                        const url = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                        var date = new Date(day.dt * 1000);
                        return (
                            <Col md="2.5">
                                <Card className="card">
                                    <Card.Header>{date.toDateString()}<br /></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Max Temperature:<br/> {(day.main.temp_max- 273.15).toFixed(2) + " C"}<br />Min Temperature:<br /> {(day.main.temp_min- 273.15).toFixed(2) + " C"} <br /><br />
                                            {day.weather[0].main}: <br/>{day.weather[0].description} <br /> {<img src={url} />}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer><Button variant="primary" onClick={() => hourlyData(datetime[0])}>Check hourly forecast</Button></Card.Footer>
                                </Card>
                            </Col>
                        )
                    }
                    })
                    : null}
                </Container>
            </div>
        </>
    );
}

export default Day;