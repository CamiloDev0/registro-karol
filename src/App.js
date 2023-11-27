import React, { useState } from 'react';
import './App.css';

function App() {
	const [currentScreen, setCurrentScreen] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [registeredUsers, setRegisteredUsers] = useState([]);

	// const firebaseConfig = {
	// 	apiKey: 'AIzaSyDBErbEBvDu5SkAj1e7VsKENIC6of-wams',
	// 	authDomain: 'karlog-registro-pisina.firebaseapp.com',
	// 	projectId: 'karlog-registro-pisina',
	// 	storageBucket: 'karlog-registro-pisina.appspot.com',
	// 	messagingSenderId: '109347379517',
	// 	appId: '1:109347379517:web:f190bd2cb0d380208a4d54',
	// 	measurementId: 'G-EPW670CXJS',
	// };

	const getdata = async (e) => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headres: {
				'Content-Type': 'aplication/json',
			},
			body: JSON.stringify({
				name,
				email,
			}),
		};
		const res = await fetch(
			'https://karlog-registro-pisina-default-rtdb.firebaseio.com/',
			options
		);
		if (res) {
			alert('Meesage Sent');
		} else {
			alert('Error Occuere');
		}
	};

	function next() {
		setCurrentScreen(currentScreen + 1);
	}

	function check() {
		if (registeredUsers.length === 0) {
			setCurrentScreen(0);
			return (
				<div style={{ position: 'absolute' }}>Ingresar un usuario minimo !</div>
			);
		}
	}
	const handleRegister = () => {
		const newUser = {
			name,
			email,
		};

		// Agregar el nuevo usuario al estado (en este caso, al array 'registeredUsers')
		setRegisteredUsers([...registeredUsers, newUser]);

		// Limpiar campos después del registro
		setName('');
		setEmail('');
	};

	return (
		<div>
			{currentScreen === 0 ? (
				<div>
					<img
						src='images/frame1.png'
						style={{ width: '100%', height: '100%', position: 'absolute' }}
						alt=''
					/>
					<img
						src='images/boton.png'
						style={{
							width: '60%',
							height: '7%',
							left: '20%',
							top: '76%',
							position: 'absolute',
						}}
						alt=''
						onClick={() => {
							next();
						}}
					/>
					<div className='container__form'>
						<input
							type='text'
							placeholder='Nombre'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type='email'
							placeholder='Correo electrónico'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							style={{
								width: '100%',
								height: '40px',
								border: '2px solid #E6295E',
								borderRadius: '8px',
								backgroundColor: '#E6295E',
								textTransform: 'uppercase',
								color: '#FFFFFF',
							}}
							onClick={handleRegister}
						>
							Registrar
						</button>

						<div className='container__list'>
							<h3>Usuarios Registrados</h3>
							<ul>
								{registeredUsers.map((user, index) => (
									<li key={index}>
										Nombre: {user.name}, Email: {user.email}
									</li>
								))}
							</ul>
						</div>
						<button onClick={() => [next(), check(), getdata()]}>
							Finalizar Registro
						</button>
					</div>
				</div>
			) : null}
			{currentScreen === 1 ? (
				<div>
					<img
						src='images/frame2.png'
						style={{ width: '100%', height: '100%', position: 'absolute' }}
						alt=''
					/>
					<img
						src='images/boton.png'
						style={{
							width: '30%',
							height: '20%',
							left: '20%',
							top: '50%',
							position: 'absolute',
						}}
						alt=''
						onClick={() => [setCurrentScreen(0), setRegisteredUsers([])]}
					/>
					<img
						src='images/boton.png'
						style={{
							width: '30%',
							height: '20%',
							left: '50%',
							top: '50%',
							position: 'absolute',
						}}
						alt=''
						onClick={() => [setCurrentScreen(0), setRegisteredUsers([])]}
					/>
				</div>
			) : null}
		</div>
	);
}

export default App;
