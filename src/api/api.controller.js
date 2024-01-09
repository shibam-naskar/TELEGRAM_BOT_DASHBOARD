import axios from 'axios';

class ConfigApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async blockUser(uid) {
        try {
            const response = await axios.patch(`${this.baseUrl}/config/blockuser`, { uid });
            return response.data;
        } catch (error) {
            console.error('Error blocking user:', error.message);
            throw error;
        }
    }

    async unblockUser(uid) {
        try {
            const response = await axios.patch(`${this.baseUrl}/config/unblockuser`, { uid });
            return response.data;
        } catch (error) {
            console.error('Error unblocking user:', error.message);
            throw error;
        }
    }

    async getUsers() {
        try {
            const response = await axios.patch(`${this.baseUrl}/config/getusers`);
            return response.data;
        } catch (error) {
            console.error('Error getting users:', error.message);
            throw error;
        }
        
    }

    async getConfig(keyname) {
        try {
            const response = await axios.patch(`${this.baseUrl}/config/get-keys`, {keyname:keyname});
            return response.data;
        } catch (error) {
            console.error('Error getting config:', error.message);
            throw error;
        }
    }

    async updateconfig(telegramBotKey,mapsApiKey) {
        try {
            const response = await axios.patch(`${this.baseUrl}/config/update-keys`, {telegramBotKey:telegramBotKey,mapsApiKey:mapsApiKey});
            return response.data;
        } catch (error) {
            console.error('Error Setting config:', error.message);
            throw error;
        }
    }
}

export default ConfigApiClient;
