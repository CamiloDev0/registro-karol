import React, { useState } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { PAGES } from './utils/pages';
import { usePageView } from './hooks/usePageView';

function App() {
	const { currentScreen, goToPage } = usePageView();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [file, setFile] = useState('');
	const [registeredUsers, setRegisteredUsers] = useState([]);
	const [qrUrl, setQrUrl] = useState(undefined);
	const [isLoadingImage, setIsLoadingImage] = useState(false);
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

	function check() {
		if (registeredUsers.length === 0) {
			goToPage(PAGES.FORM);
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

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setFile(reader.result);
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	const exportAsImage = async () => {
		try {
			setIsLoadingImage(true);
			const element = document.querySelector('.container-image');
			if (element instanceof HTMLElement) {
				console.log('1');
				const canvas = await html2canvas(element, {
					allowTaint: true,
					useCORS: true,
					logging: true,
				});
				const canvasImage = canvas.toDataURL('image/png', 1.0);
				const headers = {
					'Content-Type': 'application/json',
				};
				const imageKey = uuid();

				const data = JSON.stringify({
					image: canvasImage,
					id: imageKey,
					folder: 'mirror',
				});
				await axios({
					method: 'post',
					url: 'https://mocionws.info/',
					headers,
					data,
				});
				setQrUrl(imageKey);
			} else console.error('Element not found');
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingImage(false);
		}
	};
	return (
		<div>
			{currentScreen === PAGES.FORM ? (
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
							goToPage(PAGES.UPLOAD_IMAGE);
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
						<button
							onClick={() => {
								goToPage(PAGES.DESPEDIDA);
								check();
								getdata();
							}}
						>
							Finalizar Registro
						</button>
					</div>
				</div>
			) : null}

			{currentScreen === PAGES.DESPEDIDA ? (
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
						onClick={() => {
							goToPage(PAGES.FORM);
							setRegisteredUsers([]);
						}}
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
						onClick={() => {
							goToPage(PAGES.FORM);
							setRegisteredUsers([]);
						}}
					/>
				</div>
			) : null}
		</div>
	);
}

export default App;
