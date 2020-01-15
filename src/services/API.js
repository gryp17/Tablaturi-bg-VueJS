import axios from 'axios';

export default axios.create({
	timeout: 5000,
	withCredentials: true
});

export const API_URL = 'http://localhost/Tablaturi-bg-API/API';
