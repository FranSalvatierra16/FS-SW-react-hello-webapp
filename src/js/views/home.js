import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import "../../styles/home.css";
import { FaTimes, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.cargarPlanetas();
        actions.cargarPersonajes();
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
                            <Button variant="outline-primary" onClick={() => setShowFavoritesModal(true)} className="btn">
                                Mis Favoritos ({favorites.length})
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="content">
                <section className="section">
                    <h2>Personajes</h2>
                    <div className="characters-container">
                        {store.characters.map((item) => (
                            <Col key={item.id} className="custom-card-col">
                                <Card className="custom-card">
                                    <Card.Img className="custom-card-img" variant="top" src={item.img} alt={item.name} />
                                    <Card.Body className="custom-card-body">
                                        <Card.Title className="custom-card-title">{item.name}</Card.Title>
                                        {item.gender && (
                                            <Card.Text className="custom-card-text property">Género:</Card.Text>
                                        )}
                                        {item.gender && (
                                            <Card.Text className="custom-card-text response">{item.gender}</Card.Text>
                                        )}
                                        {item.hair_color && (
                                            <Card.Text className="custom-card-text property">Color de pelo:</Card.Text>
                                        )}
                                        {item.hair_color && (
                                            <Card.Text className="custom-card-text response">{item.hair_color}</Card.Text>
                                        )}

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button className="favorite-button btn-danger" onClick={() => addToFavorites(item)}>
                                                <FaHeart />
                                            </Button>
                                            <Link to={"/single/" + item.uid}>
                                                <button type="button" className="btn btn-dark shadow-sm">
                                                    Ver más <i className="fas fa-long-arrow-alt-down ms-1"></i>
                                                </button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </div>
                </section>
                <section className="section">
                    <h2>Planetas</h2>
                    <div className="planets-container">
                        {store.planets.map((item) => (
                            <Col key={item.id} className="custom-card-col">
                                <Card className="custom-card">
                                    <Card.Img
                                        className="custom-card-img"
                                        variant="top"
                                        src={item.img}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://th.bing.com/th/id/R.5729f56eec0f8022315cbb82bcb00987?rik=WsYjgXjrD3912Q&riu=http%3a%2f%2fcdn.playbuzz.com%2fcdn%2f16c54ffe-46be-49f9-849e-cfbbada9632c%2fd0e004ea-bcf5-46ff-8411-77ecda58b2de.jpg&ehk=snk1ln0ZXud90%2fcff1FS5IblcVMDJbH3%2f9CtgX94NQo%3d&risl=&pid=ImgRaw&r=0";
                                        }}
                                    />
                                    <Card.Body className="custom-card-body">
                                        <Card.Title className="custom-card-title">{item.name}</Card.Title>
                                        {item.population && (
                                            <Card.Text className="custom-card-text property">Población:</Card.Text>
                                        )}
                                        {item.population && (
                                            <Card.Text className="custom-card-text response">{item.population}</Card.Text>
                                        )}
                                        {item.terrain && (
                                            <Card.Text className="custom-card-text property">Territorio:</Card.Text>
                                        )}
                                        {item.terrain && (
                                            <Card.Text className="custom-card-text response">{item.terrain}</Card.Text>
                                        )}

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button
                                                className="favorite-button btn-danger"
                                                onClick={() => addToFavorites(item)}
                                            >
                                                <FaHeart />
                                            </Button>
                                            <Link to={"/singlePlanet/" + item.uid}>
                                                <button
                                                    type="button"
                                                    className="btn btn-dark shadow-sm"
                                                >
                                                    Ver más <i className="fas fa-long-arrow-alt-down ms-1"></i>
                                                </button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </div>
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
                                    <button className="btn btn-danger" onClick={() => removeFromFavorites(favItem)}>
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
                        <Card.Img variant="top" src={selectedFavorite ? selectedFavorite.img : ""} alt={selectedFavorite ? selectedFavorite.name : ""} />
                        <Card.Body>
                            <Card.Title>{selectedFavorite ? selectedFavorite.name : ""}</Card.Title>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </div>
    );
};