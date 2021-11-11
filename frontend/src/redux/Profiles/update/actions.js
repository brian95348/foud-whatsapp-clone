export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST"
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS"
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAIL"

export const updateProfileRequest = ()=>{
    return {
        type:UPDATE_PROFILE_REQUEST
    }
}

export const updateProfileSuccess = (data)=>{
    return {
        type:UPDATE_PROFILE_SUCCESS,
        payload:data.updatedProfile
    }
}

export const updateProfileFailure = (err)=>{
    return {
        type:UPDATE_PROFILE_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
