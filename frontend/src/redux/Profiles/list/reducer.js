import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    profiles: [],
    profilesError: ''
}

const profilesReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_PROFILES_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_PROFILES_SUCCESS:
            return {
                ...state,
                loading:false,
                profiles:action.payload,
                profilesError:''
            };
        case actionCreators.FETCH_PROFILES_FAILURE:
            return {
                ...state,
                loading:false,
                profilesError:action.payload,
                profiles:[]
            };
        default:
            return state;
    }
}

export const fetchProfiles = (profile_username, token) => async (dispatch) => {
    dispatch(actionCreators.fetchProfilesRequest())
    try {
        const {data} = await customAxios.get(`/profiles/`,
                            {headers: {token: `Bearer ${token}`},
                                params:{profile_username}});
        dispatch(actionCreators.fetchProfilesSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchProfilesFailure(error))
    }      
}


export default profilesReducer