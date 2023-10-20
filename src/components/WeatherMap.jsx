import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';


const WeatherForecast = ({ country }) => {
    const [forecast, setForecast] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!country || !country.capital) {
            setLoading(false);
            setError(true);
        } else {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
                .then((res) => {
                    if (res && res.data) {
                        setForecast(res.data);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [country]);

    // Function to format the date
    // to get the date diplayed in the forecasts
    function createDate(dt) {
        const day = new Date(dt * 1000);
        // if (type === "long") {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return day.toLocaleString("en-uk", options); // Friday, January 15, 2021
        // } else {
        //   return day.toLocaleString("en-us", { weekday: "long" }); // Friday
        // }
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status" className="center" variant="info">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <div>Error fetching forecast data.</div>;
    }

    if (!forecast || !forecast.list || forecast.list.length === 0) {
        return <div>Weather forecast data not available.</div>;
    }

    return (
        <Row className="mt-5">
            {forecast.list.map((item, index) => {
                const currentDate = createDate(item.dt);

                if (index === 0 || currentDate !== createDate(forecast.list[index - 1].dt)) {
                    return (
                        <Col key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <Card>
                                <Card.Body className="text-center">
                                    <h5>{currentDate}</h5>
                                    <p>
                                        {Math.round(item.main.temp)} °C in {country.capital} and {item.weather[0].description}
                                    </p>
                                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                }

                return null;
            })}
        </Row>
    );
};

export default WeatherForecast;

