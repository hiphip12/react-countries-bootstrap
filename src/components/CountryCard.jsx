import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { addFavourite, removeFavourite } from "../features/countries/favouritesSlice";

const CountryCard = ({ country }) => {
    const favouritesList = useSelector((state) => state.favourites.favourites);
    const dispatch = useDispatch();

    return (
        <Col className="mt-5">

            <Card className="h-100 border-dark m-2">

                <LinkContainer
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                >
                    <div className="p-3">
                        <Card.Header className="d-flex flex-column bg-secondary text-light text-center p-4">
                            <Card.Title>{country.name.common}</Card.Title>
                            <Card.Subtitle>
                                {country.capital}
                            </Card.Subtitle>
                        </Card.Header>

                        <Row className="justify-content-center">
                            <Card.Img
                                variant="top"
                                src={country.flags.svg}
                                className="rounded h-50 mt-3"
                                style={{
                                    objectFit: "cover",
                                    minHeight: "150px",
                                    maxHeight: "150px",
                                    // minWidth: "400px",
                                    maxWidth: "250px",
                                }}
                            />
                        </Row>
                        <Card.Body className="d-flex flex-column text-light text-center mt-3">
                            <ListGroup
                                variant="flush"
                                className="flex-grow-1 justify-content-end"
                            >
                                <ListGroup.Item>
                                    <i className="bi bi-globe2">
                                        <span className="ms-2">
                                            {Object.values(country.languages ?? {}).join(", ")}
                                        </span>
                                    </i>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-coin">
                                        <span className="ms-2">
                                            {Object.values(country.currencies ?? {})
                                                .map((currency) => currency.name)
                                                .join(", ")}
                                        </span>
                                    </i>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-person-plus">
                                        <span className="ms-2">
                                            {country.population.toLocaleString()}
                                        </span>
                                    </i>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </div>
                </LinkContainer>
                <Card.Footer className="text-center bg-secondary ms-3 me-3">
                    {favouritesList?.includes(country.name.common) ? (
                        <i
                            className="bi-hand-thumbs-up-fill text-light m-1 p-2"
                            onClick={() => dispatch(removeFavourite(country.name.common))}></i>
                    ) : (
                        <i
                            className="bi-hand-thumbs-up text-light m-1 p-2"
                            onClick={() => dispatch(addFavourite(country.name.common))}></i>
                    )}
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default CountryCard;