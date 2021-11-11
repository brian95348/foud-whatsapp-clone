import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    creating : false,
    newProfile: {},
    created: false,
    createError: ''
}

const createProfileReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.CREATE_PROFILE_REQUEST:
            return {
                ...state,
                creating:true
            };
        case actionCreators.CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                creating:false,
                created: true,
                newProfile:action.payload,
                createError:''
            };
        case actionCreators.CREATE_PROFILE_FAILURE:
            return {
                ...state,
                creating:false,
                created: false,
                createError:action.payload,
                newProfile:{}
            };
        default:
            return state;
    }
}

export const createProfile = (newProfile,token) => async (dispatch) => {
    dispatch(actionCreators.createProfileRequest())
    try {
        const {data} = await customAxios.post(`/profiles/create`,newProfile,
                                            {headers: {token: `Bearer ${token}`,
                                     'Content-Type': 'multipart/form-data'   }});
        dispatch(actionCreators.createProfileSuccess(data))
    } catch (error) {
        dispatch(actionCreators.createProfileFailure(error))
    }      
}

export default createProfileReducer