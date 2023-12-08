import axios from './axios'

export default class AdminService {
    getAdminsList() {
        return axios.get('/admins')
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error
            });
    }

    createAdmin(dataToCreate) {
        return axios.post('/admins', dataToCreate)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error creating data:', error);
                throw error;
            });
    }

    getAdmin(id) {
        return axios.get(`/admins/${id}/edit`)
            .then(response => {
                return response.data.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error
            });
    }

    updateAdmin(id, dataToUpdate) {
        return axios.put(`/admins/${id}`, dataToUpdate)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error updating data:', error);
                throw error;
            });
    }

    deleteAdmin(id) {
        return axios.delete(`/admins/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error updating data:', error);
                throw error;
            });
    }
}
