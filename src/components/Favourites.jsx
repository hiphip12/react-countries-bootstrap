import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { clearFavourites } from "../features/countries/favouritesSlice";
import CountryCard from "./CountryCard";


const Favourites = () => {
    const dispatch = useDispatch()

    let countriesList = useSelector((state) => state.countries.countries)
    const loading = useSelector((state) => state.countries.loading)
    const [search, setSearch] = useState("")
    const favouritesList = useSelector((state) => state.favourites.favourites)

    if (favouritesList !== null) {
        countriesList = countriesList.filter(c => favouritesList.includes(c.name.common))
    }
    else {
        countriesList = []
    }

    useEffect(() => {
        dispatch(initializeCountries())
    }, [dispatch])

    if (loading) {
        return (
            <Col className="text-center m-5">
                <Spinner
                    animation="border"
                    role="status"
                    className="center"
                    variant="info"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        )
    }

    return (<Container fluid className="bg-secondary mt-5" style={{ minHeight: '62rem' }}>
        <Row>
            <Col className="my-5 d-flex justify-content-center">
                <Form>
                    <Form.Control
                        type="search"
                        className="me-2 "
                        placeholder="Search favourites"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
                <Button variant="info" className="w-auto mx-3" onClick={() => {
                    dispatch(clearFavourites())
                }}>Clear All</Button>
            </Col>
        </Row>
        <Row xs={1} md={2} lg={4} className=" g-3">
            {countriesList
                .filter((c) => {
                    return c.name.official.toLowerCase().includes(search.toLowerCase());
                })
                .map((country) => (
                    <CountryCard key={country.name.common} country={country} />
                ))}
        </Row>
    </Container >)
}

export default Favourites;