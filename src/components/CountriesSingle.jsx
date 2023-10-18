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

  // Declare a regular variable
  let previousDate = '';

  // useEffect(() => {
  //   if (!country.capital) {
  //     setLoading(false)
  //     setError(true)
  //   } else {

  //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
  //       .catch((error) => {
  //         console.log(error)
  //         setError(true)
  //       })
  //       .then((res) => {
  //         if (res && res.data) {
  //           setWeather(res.data)
  //         }
  //         setLoading(false)
  //       })
  //   }
  // }, [country.capital])
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
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital}`} />
        </Col>
        <Col md={6}>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
          {errors && (
            <p className="alert alert-danger">
              Sorry, we don't have weather information for this country.
            </p>
          )}
          {!errors && weather && (
            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)}</strong> °C in {country.capital} and {weather.weather[0].description}
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />
            </div>
          )}
        </Col>
      </Row>
      <Col className="mt-5">
        <h3>Forecast in the next 5 days:</h3>
        {!errors && forecast && (
          <Row className="d-flex flex-wrap">
            {forecast.list.map((item, index) => {
              // access date from the forecast entry to use is as string
              const currentDate = createDate(item.dt);

              // To render current new day, checking against previous one
              if (index === 0 || currentDate !== createDate(forecast.list[index - 1].dt)) {
                return (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <Card>
                      <Card.Body className="text-center">
                        <h5>{currentDate}</h5>
                        <p>
                          {Math.round(item.main.temp)} °C in {country.capital} and {item.weather[0].description}
                        </p>
                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                      </Card.Body>
                    </Card>
                  </div>
                );
              }

              return null; // to prevent rendiring more items for the same day.
            })}
            {/* </Card> */}
          </Row>
        )}
      </Col>
      {/* </Row> */}
      <Row className="mt-4">
        <Col>
          <Button variant="light" onClick={() => navigate('/countries')}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container >
  );
};

export default CountriesSingle;