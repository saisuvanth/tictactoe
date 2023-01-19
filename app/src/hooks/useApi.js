import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const useApi = () => {
	const { user } = useContext(AuthContext);

	const api = axios.create({
		baseURL: "http://localhost:3002/",
		headers: {
			Authorization: `Bearer ${user?.token}`
		}
	});

	const login = async (data) => {
		const res = await api.post("login", data);
		return res.data;
	}

	const register = async (data) => {
		const res = await api.post("signup", data);
		return res.data;
	}

	const updateGame = async ({ board, gameId }) => {

		const res = await api.put(`game/${gameId}`, { board });
		return res.data;
	}

	const createGame = async (data) => {
		const res = await api.post('create-game', data);
		return res.data;
	}

	return {
		login,
		register,
		createGame,
		updateGame
	};

}

export default useApi;