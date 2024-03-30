import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://daki1987-001-site1.ftempurl.com/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }


});