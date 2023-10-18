import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";


const countriesAPI = {
    getAll: async () => {
        const request = axios.get(baseUrl);
        const response = await request;
        return response.data;
        // return request.then((response) => response.data);
    }

};

// export default { getAll };
export default countriesAPI;