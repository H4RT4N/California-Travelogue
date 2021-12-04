import ACTION_TYPES from "../actions/types";

const initialState = {
    authData: null,
};

export default function Reduce(state = initialState, action) {
    switch(action.type) {
        case ACTION_TYPES.LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return {
                ...state, 
                authData: action.data
            };
        case ACTION_TYPES.LOGOUT:
            localStorage.clear();
            return {
                ...state, 
                authData: null
            };
        default:
            return state;
    }
};