const data = localStorage.getItem('data') || '';
const datos = localStorage.getItem('datos') || '';
const AuthStatus = localStorage.getItem('AuthStatus') || false;

const initialState = {
    token: data,
    datos: datos,
    AuthStatus: AuthStatus,
    notification: [],
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SIGNIN":
            console.log(action.payload)
            localStorage.setItem('data', action.payload);
            localStorage.setItem('datos', action.payload.data);
            localStorage.setItem('AuthStatus', true);
            return {
                ...state,
                token: action.payload,
                datos: action.payload.data,
                AuthStatus: true,
            };
        case "SIGNOUT":
            localStorage.removeItem('data');
            localStorage.removeItem('AuthStatus');
            return { ...state, data: "", AuthStatus: false };
        case "CHANGE_ROLE":
            localStorage.setItem('data', JSON.stringify(action.payload));
            return { ...state, data: action.payload };
        case "NOTIFY":
            return { ...state, notification: action.payload }
        case "LOADING_AUTH":
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}
