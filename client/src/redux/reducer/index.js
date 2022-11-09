import { GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, ORDER_ALPHABETICALLY, ORDER_BY_POPULATION, GET_COUNTRY_BY_ID, GET_ALL_ACTIVITIES, CLEAN, CREATE_ACTIVITY, DELETE_ACTIVITY } from "../actions/index";

const initialState = {
    allCountries: [],
    filteredCountries: [],
    allActivities: [],
    countryById: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filteredCountries: action.payload
            };
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                filteredCountries: action.payload
            };
        case FILTER_BY_CONTINENT:
            const all = state.allCountries;
            const byContinent = action.payload === 'all' ? all : all.filter(c => c.continent.toLowerCase() === action.payload);
            return {
                ...state,
                filteredCountries: byContinent
            };
        case FILTER_BY_ACTIVITY:
            const allCountries = state.allCountries;
            const byActivity = action.payload === 'all' ? allCountries : allCountries.filter(c => {
                const activity = c.activities.filter(a => a.name === action.payload);
                return activity.length;
            });
            return {
                ...state,
                filteredCountries: byActivity
            };
        case ORDER_ALPHABETICALLY:
            let alphabetically = [];
            switch (action.payload) {
                case 'asc':
                    alphabetically = state.filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'desc':
                    alphabetically = state.filteredCountries.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            };

            return {
                ...state,
                filteredCountries: [...alphabetically]
            };
        case ORDER_BY_POPULATION:
            let byPopulation = [];
            switch (action.payload) {
                case 'asc':
                    byPopulation = state.filteredCountries.sort((a, b) => a.population - b.population);
                    break;
                case 'desc':
                    byPopulation = state.filteredCountries.sort((a, b) => b.population - a.population);
                    break;
                default:
                    break;
            };

            return {
                ...state,
                filteredCountries: [...byPopulation]
            };
        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                countryById: action.payload
            };
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            };
        case CREATE_ACTIVITY:
            return {
                ...state
            }
        default:
            return state;
    };
};

export default rootReducer;