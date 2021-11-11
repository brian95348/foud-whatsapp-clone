import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    profile: {},
    profileError: ''
}

const profileDetailReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_PROFILE_DETAIL_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_PROFILE_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                profile:action.payload,
                profileError:''
            };
        case actionCreators.FETCH_PROFILE_DETAIL_FAILURE:
            return {
                ...state,
                loading:false,
                profileError:action.payload,
                profile:{}
            };
        default:
            return state;
    }
}

export const fetchProfileDetail = (username,token) => async (dispatch) => {
    dispatch(actionCreators.fetchProfileDetailRequest())
    try {
        const {data} = await customAxios.get(`/profiles/${username}`,
                                {headers: {token: `Bearer ${token}`}});
        dispatch(actionCreators.fetchProfileDetailSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchProfileDetailFailure(error))
    }      
}

export default profileDetailReducer