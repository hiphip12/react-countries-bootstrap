import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CountriesSingle = () => {
  //function hooks
  const location = useLocation();
  const navigate = useNavigate();

  //state Hooks
  const [weather, setWeather] = useState('');
  const [forecast, setForecast] = useState('');
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //destructuring variables
  const country = location.state.country;

  useEffect(() => {
    if (!country.capital) {
      setLoading(false);
      setError(true);
    } else {
      Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
      ])
        .then((res) => {
          const [weatherResponse, forecastResponse] = res;

          if (weatherResponse && weatherResponse.data) {
            setWeather(weatherResponse.data);
          }

          if (forecastResponse && forecastResponse.data) {
            setForecast(forecastResponse.data);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setLoading(false);
        });
    }
  }, [country.capital]);


  console.log("Weather: ", weather);
  console.log("Forecast: ", forecast);

  // to get the date diplayed in the forecasts
  function createDate(dt) {
    const day = new Date(dt * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return day.toLocaleString("en-uk", options);
  }
  if (loading) {
    return (
      <Container className="text-center">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="bg-secondary " style={{ minHeight: '62rem' }}>


      <Row className='text-center'>
        <Col className="m-5">
          <h2 className="display-4 text-center text-light">{country.name.common}</h2>
          <h3 className="text-center text-light">{country.capital}</h3>
          <Image
            thumbnail
            src={`https://source.unsplash.com/1600x900/?${country.capital}`}
            className="mt-5 justify-content-center"
            style={{
              objectFit: "cover",
            }}
          />
          <h3 className='text-light mt-5'>Current weather:</h3>
          <Card className="justify-content-center mt-5 p-1">
            <Card.Body className='bg-info rounded pt-5'>
              {errors && (
                <p style={{ fontSize: "4rem" }}>
                  🤷
                </p>
              )}
              {!errors && weather && (
                <div>
                  <h5>
                    Right now it is <strong>{parseInt(weather.main.temp)} °C</strong> in {country.capital} and {weather.weather[0].description}
                  </h5>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={`${weather.weather[0].description}`}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col className="mt-5">
          <h3 className='text-light mx-1'>Forecast for today & the next 5 days:</h3>
          {errors && (
            <p className="alert alert-danger m-5 p-4 border-light" style={{ border: "5px solid" }}>
              Sorry, we don't have weather information for this country
              <span><i className="bi bi-emoji-smile-upside-down fs-4 ms-2">
              </i></span>
            </p>
          )}
          {!errors && forecast && (
            <div>
              {forecast.list.map((item, index) => {
                const currentDate = createDate(item.dt);
                if (index === 0 || currentDate !== createDate(forecast.list[index - 1].dt)) {
                  return (
                    <Col key={index}>
                      <Card className="justify-content-center m-5 p-1">
                        <Card.Body className="text-center bg-info rounded">
                          <Row>
                            <Col>
                              <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                              />
                            </Col>
                            <Col className='pt-3'>
                              <h5>{currentDate}</h5>
                              <p>
                                {Math.round(item.main.temp)} °C in {country.capital} and {item.weather[0].description}
                              </p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }
                return null; // to avoid more entries for the same day
              })}
            </div>
          )}
        </Col>
      </Row>
      <Row className="m-5 text-center -5">
        <Col>
          <Button variant="light" onClick={() => navigate('/countries')}>
            ← Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>

  );
};

export default CountriesSingle;