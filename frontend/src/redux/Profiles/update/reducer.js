import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    isUpdating : false,
    isUpdated: false,
    updatedProfile: {},
    updateError: ''
}

const updateProfileReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isUpdating:true
            };
        case actionCreators.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdating:false,
                isUpdated: true,
                updatedProfile:action.payload,
                updateError:''
            };
        case actionCreators.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isUpdating:false,
                isUpdated: false,
                updateError:action.payload,
                updatedProfile:{}
            };
        default:
            return state;
    }
}

export const updateProfile = (username,updatedProfile,token) => async (dispatch) => {
    dispatch(actionCreators.updateProfileRequest())
    try {
        const {data} = await customAxios.put(`/profiles/${username}`,updatedProfile,
                                                    {headers: {token: `Bearer ${token}`,
                                                    'Content-Type': 'multipart/form-data'}});
        dispatch(actionCreators.updateProfileSuccess(data))
    } catch (error) {
        dispatch(actionCreators.updateProfileFailure(error))
    }      
}

export default updateProfileReducer