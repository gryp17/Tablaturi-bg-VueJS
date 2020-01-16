import axios from 'axios';

export const API_URL = 'http://localhost/Tablaturi-bg-API/API';

const API = axios.create({
	baseURL: API_URL,
	timeout: 8000,
	withCredentials: true
});

//intercept all responses and trigger an exception if there is an API error
API.interceptors.response.use((res) => {
	if (res.data && res.data.error && typeof res.data.error !== 'object') {
		return Promise.reject(res.data.error);
	}

	return res;
});

export default API;
