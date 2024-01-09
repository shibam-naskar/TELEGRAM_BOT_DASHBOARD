const axios = require('axios');

async function testBlockUser() {
    try {
        const response = await axios.patch('http://localhost:3000/config/blockuser', {
            uid: 5573078158 // Replace with the desired user ID
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error blocking user:', error.message);
    }
}

async function testUnblockUser() {
    try {
        const response = await axios.patch('http://localhost:3000/config/unblockuser', {
            uid: 5573078158 // Replace with the desired user ID
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error unblocking user:', error.message);
    }
}

async function testGetUsers() {
    try {
        const response = await axios.patch('http://localhost:3000/config/getusers');

        console.log(response.data);
    } catch (error) {
        console.error('Error getting users:', error.message);
    }
}

async function getConfigs() {
    try {
        const response = await axios.patch('http://localhost:3000/config/get-keys',{
            keyname:'MAPS_API_KEY'
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error getting users:', error.message);
    }
}

// Uncomment the function you want to test
// testBlockUser();
// testUnblockUser();
testGetUsers()
// getConfigs()
