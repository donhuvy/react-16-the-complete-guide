import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-5a91b.firebaseio.com/'
});

export default instance