import customAxios from '../../axios/axios'
import * as actionCreators from './actions'
// ?   JSON.parse(sessionStorage.getItem("user")) : 
console.log(sessionStorage);
// const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
 const initialState = {username: '',
                        userId: '',
                        isAdmin: false,
                        isloggingIn: false,
                        isloggedIn : false,
                        token: '',
                        loginError:'',
                        profile_username: null
                    }

const userLoginReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.LOGIN_REQUEST:
            return {
                ...state,
                isloggingIn:true
            };
        case actionCreators.LOGIN_WRONG_CREDENTIALS:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                loginError: action.payload.message
            };
        case actionCreators.LOGIN_SUCCESS:
            return {
                ...state,
                isloggingIn:false,
                username:action.payload.username,
                userId:action.payload.id,
                isAdmin: action.payload.isAdmin,
                token:action.payload.accessToken,
                isloggedIn: true,
                profile_username: action.payload.profile
            };
        case actionCreators.LOGIN_FAILURE:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                loginError: action.payload
            };
        default:
            return state;
    }
}

export const userLogin = (username) => async (dispatch,getState) => {
    dispatch(actionCreators.userLoginRequest())
    try {
        const {data} = await customAxios.post('/auth/login',username);
        dispatch(actionCreators.userLoginSuccess(data))
        // localStorage.setItem('user',JSON.stringify(getState().userLogin))
    } catch (err) {
        dispatch(actionCreators.userLoginFailure(err))
    }     
}

export const userLogout = () => async (dispatch) => {
    dispatch(actionCreators.userLogoutRequest())  
    localStorage.removeItem('user')   
}

export default userLoginReducer