import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const SinglePlanet = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planet, setPlanet] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);

    useEffect(() => {
        const fetchPlanet = async () => {

            if (!store.planets || store.planets.length === 0) {
                await actions.cargarPlanetas();
            }


            const planetId = parseInt(params.uid);
            const selectedPlanet = store.planets.find((char) => char.uid === planetId.toString());

            if (selectedPlanet) {
                setPlanet(selectedPlanet);
            } else {
                console.error("¡Planeta  no encontrado!");
            }
        };

        fetchPlanet();
    }, [params.uid, store.planets, actions.cargarPlanetas]);

    const addToFavorites = () => {

        setFavorites([...favorites, planet]);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Star Wars</h1>
            </header>

            <Container className="first-container">
                <Row>
                    <Col xs={12} md={6}>
                        <img src={planet?.img} alt={planet?.name} className="planet-image" />
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="planet-details">
                            <h1 className="display-4">{planet?.name}</h1>
                            <p>
                                Here we should have a description of each StarWars element, but this API doesn&apos;t provide one, at
                                least not personalized.
                            </p>
                        </div>
                    </Col>
                </Row>
                <hr className="my-4 hr" />
                <Row className="info second-container">

                    <Col sm={2}>Name: {planet?.name}</Col>
                    <Col sm={2}>Population: {planet?.population}</Col>
                    <Col sm={2}>Climate: {planet?.climate}</Col>
                    <Col sm={2}>Terrain {planet?.terrain}</Col>
                    <Col sm={2}>Diameter: {planet?.diameter}</Col>
                    <Col sm={2}>Rotation Period: {planet?.rotation_period}</Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Link to="/">
                            <Button variant="primary">Volver al Inicio</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>


        </div>
    );
};