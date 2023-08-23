const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [],
			todos: [],
			planets: [],
			characters: [],
			films: [],
			vehicles: []
		},
		actions: {
			cargarPlanetas: async () => {
				const planetsUrl = "https://www.swapi.tech/api/planets/"
				var planets = []
				try {
					let resp = await (fetch(planetsUrl))
					if (!resp.ok) {
						console.error(resp.status + ":" + resp.statusText)
						return
					}

					let data = await resp.json()
					planets = data.results
				}
				catch (error) {
					console.error(error)
					return
				}
				planets = planets.map(planet => fetch(planet.url))
				try {

					let respuestas = await Promise.all(planets)
					if (respuestas.every(respuesta => respuesta.ok)) {
						console.log("Todas las respuestas ok")
						respuestas = respuestas.map(respuesta => respuesta.json())
						let data = await Promise.all(respuestas)
						data = data.map(planet => {
							let { description, uid, _id, properties } = planet.result
							const img = planet.result.uid === 1 ? `https://starwars-visualguide.com/assets/img/planets/${uid+1}.jpg` : `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;

							return {
								description,
								uid,
								_id,
								img,
								...properties
							}
						}

						)
						setStore({ planets: data })
					}
				}
				catch (error) {
					console.log(error)
					return
				}
			},


			cargarPersonajes: async () => {
				const charactersUrl = "https://www.swapi.tech/api/people"
				var characters = []
				try {
					let resp = await (fetch(charactersUrl))
					if (!resp.ok) {
						console.error(resp.status + ":" + resp.statusText)
						return
					}

					let data = await resp.json()
					characters = data.results
					console.log(data.results)
				}
				catch (error) {
					console.error(error)
					return
				}
				characters = characters.map(character => fetch(character.url))
				try {
					let respuestas = await Promise.all(characters)
					if (respuestas.every(respuesta => respuesta.ok)) {
						console.log("Todas las respuestas ok")
						respuestas = respuestas.map(respuesta => respuesta.json())
						let data = await Promise.all(respuestas)
						data = data.map(character => {
							let { _id, uid, properties } = character.result

							return {

								uid,
								_id,
								img: `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`,
								...properties

							}
						}

						)
						setStore({ characters: data })
					}
				}
				catch (error) {
					console.log(error)
					return
				}

			},
			cargarFilms: async () => {

				const filmsUrl = "https://www.swapi.tech/api/films";
				try {
					let resp = await fetch(filmsUrl);
					if (!resp.ok) {
						console.error(resp.status + ":" + resp.statusText);
						return;
					}

					let data = await resp.json();
					console.log(data.result)
					setStore({ films: data.result });
				} catch (error) {
					console.log(error);
				}
			},
			cargarVehicles: async () => {

				const vehiclesUrl = "https://www.swapi.tech/api/vehicles";
				try {
					let resp = await fetch(vehiclesUrl);
					if (!resp.ok) {
						console.error(resp.status + ":" + resp.statusText);
						return;
					}

					let data = await resp.json();
					console.log(data.results)
					setStore({ vehicles: data.results });
				} catch (error) {
					console.log(error);
				}
			},
			agregarTodos: async (nuevoTodo) => {
				let { todos } = getStore()
				setStore({ todos: [...todos, nuevoTodo] })

			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
