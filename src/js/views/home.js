import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import DetailPage from "./detailPage.js";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [selectedItem, setSelectedItem] = useState(null);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		actions.cargarPlanetas();
		actions.cargarPersonajes();
		actions.cargarFilms();
		actions.cargarVehicles();
	}, []);

	function inputKeyDown(e) {
		if (e.key === "Enter") {
			actions.agregarTodos(e.target.value);
		}
	}
	function handleItemClick(item) {


		setSelectedItem(item);
	}
	function handleItemClick1(item) {

		item.img = `https://starwars-visualguide.com/assets/img/films/${item.uid}.jpg`

		setSelectedItem(item);
	}

	function handleItemClick2(item) {

		item.img = `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`

		setSelectedItem(item);
	}
	function handleCloseDetail() {
		setSelectedItem(null);
	}
	function addToFavorites(item) {
		setFavorites([...favorites, item]);
	}

	return (
		<div className="home">
			<header className="header">
				<h1>Star Wars </h1>
			</header>
			<div className="content">
				<section className="section">
					<h2>Planetas</h2>
					<div className="card-grid">
						{store.planets.map((planet) => (
							<div key={planet.id} className="card" onClick={() => handleItemClick(planet)}>
								<img src={planet.img} alt={planet.name} />
								<div className="card-title">{planet.name}</div>
								<button className="favorite-button" onClick={() => addToFavorites(planet)}>
									Añadir a favoritos
								</button>
							</div>
						))}
					</div>
				</section>

			</div>
			<section className="section">
				<h2>Personajes</h2>
				<div className="card-grid">
					{store.characters.map((character) => (
						<div key={character.id} className="card" onClick={() => handleItemClick(character)}>
							<img src={character.img} alt={character.name} />
							<div className="card-title">{character.name}</div>
							<button className="favorite-button" onClick={() => addToFavorites(character)}>
								Añadir a favoritos
							</button>
						</div>
					))}
				</div>
			</section>


			<h2>Películas</h2>
			<section className="section">

				<div className="card-grid">
					{store.films.map((film) => (
						<div key={film.id} className="card" onClick={() => handleItemClick1(film)}>
							<img src={`https://starwars-visualguide.com/assets/img/films/${film.uid}.jpg`} alt={film.name} />
							<div className="card-title">{film.name}</div>

						</div>
					))}
				</div>
			</section>
			<h2>Vehiculos</h2>
			<section className="section">

				<div className="card-grid">
					{store.vehicles.map((vehicle) => (
						<div key={vehicle.id} className="card" >
							<img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} onClick={() => handleItemClick2(vehicle)} alt={vehicle.name} />

							<div className="card-title">{vehicle.name}</div>

							<button className="favorite-button" onClick={() => addToFavorites(vehicle)}>
								Añadir a favoritos
							</button>
						</div>
					))}
				</div>
			</section>


			{selectedItem && <DetailPage selectedItem={selectedItem} onClose={handleCloseDetail} />}
		</div>
	);
};
