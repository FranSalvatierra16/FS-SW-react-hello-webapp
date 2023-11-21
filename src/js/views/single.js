import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [character, setCharacter] = useState(null);
	const [favorites, setFavorites] = useState([]);
	const [showFavoritesModal, setShowFavoritesModal] = useState(false);

	useEffect(() => {
		const fetchCharacter = async () => {

			if (!store.characters || store.characters.length === 0) {
				await actions.cargarPersonajes();
			}


			const characterId = parseInt(params.uid);
			const selectedCharacter = store.characters.find((char) => char.uid === characterId.toString());

			if (selectedCharacter) {
				setCharacter(selectedCharacter);
			} else {
				console.error("¡Personaje no encontrado!");
			}
		};

		fetchCharacter();
	}, [params.uid, store.characters, actions.cargarPersonajes]);


	return (
		<div className="container">
			<header className="header">
				<h1>Star Wars</h1>
			</header>

			<Container className="first-container">
				<Row>
					<Col xs={12} md={6}>
						<img src={character?.img} alt={character?.name} className="character-image" />
					</Col>
					<Col xs={12} md={6}>
						<div className="character-details">
							<h1 className="display-4">{character?.name}</h1>
							<p>
								Here we should have a description of each StarWars element, but this API doesn&apos;t provide one, at
								least not personalized.
							</p>
						</div>
					</Col>
				</Row>
				<hr className="my-4 hr" />
				<Row className="info second-container">
					<Col sm={2}>Birth: {character?.birth_year}</Col>
					<Col sm={2}>Gender: {character?.gender}</Col>
					<Col sm={2}>Height: {character?.height}</Col>
					<Col sm={2}>Skin Color: {character?.skin_color}</Col>
					<Col sm={2}>Eye Color: {character?.eye_color}</Col>
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