import React, { useState } from 'react';
import './App.css';

function App() {
	const [currentScreen, setCurrentScreen] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [file, setFile] = useState('');
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

	const obtenerNombreDeArchivo = (ruta) => {
		// Dividir la ruta en partes usando el separador de directorios
		var partesRuta = ruta.split('\\'); // En sistemas Unix, podrías usar '/' en lugar de '\\'

		// Tomar la última parte que contiene el nombre del archivo
		var nombreArchivoConExtension = partesRuta[partesRuta.length - 1];

		// Dividir el nombre del archivo y la extensión

		return nombreArchivoConExtension;
	};

	const getdata = async (e) => {
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
			console.log('Meesage Sent');
		} else {
			console.log('Error Occuere');
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
						<div className='custom-file-upload'>
							<input
								id='uploadImage'
								type='file'
								accept='image/*'
								placeholder='Cargar imagen'
								value={file}
								onChange={(e) => {
									console.log(e.target.value);
									setFile(e.target.value);
								}}
							/>
							<label
								className='custom-file-upload__label'
								htmlFor='uploadImage'
							>
								{file !== ''
									? obtenerNombreDeArchivo(file)
									: 'Toca para cargar una imagen'}
							</label>
						</div>

						<button onClick={() => [next(), check(), getdata()]}>
							Guardar y continuar
						</button>
					</div>
				</div>
			) : null}
			{currentScreen === 2 ? (
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
