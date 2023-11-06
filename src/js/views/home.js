import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Card, Row, Col, Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import "../../styles/home.css";
import { FaTimes } from "react-icons/fa";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const itemsPerRow = 4;

    useEffect(() => {
        actions.cargarPlanetas();
        actions.cargarPersonajes();
        actions.cargarVehicles();
    }, []);

    function addToFavorites(item) {
        setFavorites([...favorites, item]);
    }


    function removeFromFavorites(favItem) {
        const newFavorites = [...favorites];
        const index = newFavorites.findIndex((item) => item.id === favItem.id);
        if (index > -1) {
            newFavorites.splice(index, 1);
            setFavorites(newFavorites);
        }
    }



    function createCarouselItems(items, itemsPerRow) {
        const carouselItems = [];
        let currentRow = [];

        items.forEach((item, index) => {
            currentRow.push(
                <Col key={item.id} className="custom-card-col">
                    <Card className="custom-card">
                        <Card.Img
                            className="custom-card-img"
                            variant="top"
                            src={item.img}
                            alt={item.name}
                        />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                                <Button
                                    className="favorite-button btn-danger"
                                    onClick={() => addToFavorites(item)}
                                >
                                    Añadir a favoritos
                                </Button>
                                <Button
                                    className="details-button btn-danger"
                                    onClick={() => openDetails(item)}
                                >
                                    Ver Más
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );

            if (currentRow.length === itemsPerRow || index === items.length - 1) {
                carouselItems.push(
                    <Carousel.Item key={carouselItems.length}>
                        <Row className="row justify-content-between">{currentRow}</Row>
                    </Carousel.Item>
                );
                currentRow = [];
            }
        });

        return carouselItems;
    }

    function openDetails(item) {
        setSelectedFavorite(item);
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Star Wars</h1>
            </header>
            <Navbar className="favorites-navbar" bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => setShowFavoritesModal(true)}>
                                Mis Favoritos ({favorites.length})
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="content">
                <section className="section">
                    <h2>Planetas</h2>
                    <Carousel>{createCarouselItems(store.planets, itemsPerRow)}</Carousel>
                </section>
                <section className="section">
                    <h2>Personajes</h2>
                    <Carousel>{createCarouselItems(store.characters, itemsPerRow)}</Carousel>
                </section>
                <section className="section">
                    <h2>Vehículos</h2>
                    <Carousel>{createCarouselItems(store.vehicles, itemsPerRow)}</Carousel>
                </section>
            </div>

            <Modal show={showFavoritesModal} onHide={() => setShowFavoritesModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Mis Favoritos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {favorites.length > 0 ? (
                        <ul className="list-group">
                            {favorites.map((favItem) => (
                                <li key={favItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {favItem.name}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFromFavorites(favItem)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes favoritos aún.</p>
                    )}
                </Modal.Body>
            </Modal>
            <Modal show={selectedFavorite} onHide={() => setSelectedFavorite(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img
                            variant="top"
                            src={selectedFavorite ? selectedFavorite.img : ""}
                            alt={selectedFavorite ? selectedFavorite.name : ""}
                        />
                        <Card.Body>
                            <Card.Title>
                                {selectedFavorite ? selectedFavorite.name : ""}
                            </Card.Title>
                           
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </div>
    );
};