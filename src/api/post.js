import api from "./api";
import authHeaderFormData from "./headers/authHeaderFormData";
import authHeader from "./headers/authHeader";

const all = params => {
	return new Promise(function(resolve, reject) {
		api.get("posts", {
			params: params
		})
			.then(res => resolve(res.data))
			.catch(() => reject("Maaf, terjadi kesalahan pada server"));
	});
};

const get = id => {
	return new Promise(function(resolve, reject) {
		api.get(`post/${id}`)
			.then(res => resolve(res.data))
			.catch(() => reject("Maaf, terjadi kesalahan pada server"));
	});
};

const add = formData => {
	return new Promise(function(resolve, reject) {
		api.post("post", formData, {
			headers: authHeaderFormData()
		})
			.then(res => resolve(res))
			.catch(err => reject(err));
	});
};

const update = (id, formData) => {
	return new Promise(function(resolve, reject) {
		api.post(`post/${id}`, formData, {
			headers: authHeaderFormData()
		})
			.then(res => resolve(res))
			.catch(err => reject(err));
	});
};

const remove = id => {
	return new Promise(function(resolve, reject) {
		api.delete(`post/${id}`, {
			headers: authHeader()
		})
			.then(() => resolve("Berhasil menghapus data"))
			.catch(err => reject(err));
	});
};

const comments = {
	all(id, params = {}) {
		return new Promise(function(resolve, reject) {
			api.get(`post/${id}/comments`, {
				params: params
			})
				.then(res => resolve(res.data))
				.catch(() => reject("Maaf, terjadi kesalahan pada server"));
		});
	},
	add(id, name, comment) {
		return new Promise(function(resolve, reject) {
			api.post(`post/${id}/comments`, {
				name: name,
				comment: comment
			})
				.then(() => resolve("Berhasil menghapus data"))
				.catch(error => reject(error.response.data));
		});
	},
	remove(id) {
		return new Promise(function(resolve, reject) {
			api.delete(`post/comment/${id}`, {
				headers: authHeader()
			})
				.then(() => resolve("Berhasil menghapus data"))
				.catch(err => reject(err));
		});
	}
};

export default {
	add,
	all,
	get,
	update,
	remove,
	comments
};
