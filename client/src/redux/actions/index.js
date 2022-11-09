import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const ORDER_ALPHABETICALLY = 'ORDER_ALPHABETICALLY';
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';


export const getAllCountries = () => {
   return async function(dispatch) {
       let response = await axios('http://localhost:3001/countries');
       return dispatch({
           type: GET_ALL_COUNTRIES,
           payload: response.data
       });
   };
};

export const getCountryByName = (name) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispatch({
            type: GET_COUNTRY_BY_NAME, 
            payload: response.data,
            
        });
    };
};


export const filterByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    };
};

export const filterByActivity = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    };
};

export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    };
};

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    };
};

export const getCountryById = (id) => {
    return async function(dispatch) {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        return dispatch({
            type: GET_COUNTRY_BY_ID,
            payload: response.data
        });
    };
};

export const getAllActivities = () => {
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: GET_ALL_ACTIVITIES,
            payload: response.data
        });
    };
};

export const postActivity = (activity) => {
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/activities', activity);
        //return response;
        return dispatch({
            type: CREATE_ACTIVITY,
            payload: response.data
        });
    };
};
