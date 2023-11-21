// DetailView.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const DetailView = ({ item, addToFavorites }) => {
    return (
        <div>
            <Card>
                <Card.Img variant="top" src={item.img} alt={item.name} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {item.gender && <Card.Text>Género: {item.gender}</Card.Text>}
                    {item.hair_color && <Card.Text>Color de cabello: {item.hair_color}</Card.Text>}
                    {item.eye_color && <Card.Text>Color de ojos: {item.eye_color}</Card.Text>}
                    {item.population && <Card.Text>Población: {item.population}</Card.Text>}
                    {item.terrain && <Card.Text>Territorio: {item.terrain}</Card.Text>}
                    <div className="d-flex justify-content-between align-items-center">
                        <Button className="favorite-button btn-danger" onClick={() => addToFavorites(item)}>
                            <FaHeart />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DetailView;