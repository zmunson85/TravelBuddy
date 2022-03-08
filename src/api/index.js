import axios from 'axios';
//all api calls here

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async (sw, ne) => {
    try {
        //destructure data and return response object of data
        //request pass in URL Variable to axios.get request and options object
        const { data: { data } } = await axios.get(URL, {
            //using axios GET METHOD
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY
            }
        });
        return data
    } catch (error) {
        //if error return error response object message, export to get the data, call function in the app.js
        console.log(error.message)
    }
}