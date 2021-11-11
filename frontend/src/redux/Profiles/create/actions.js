export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST"
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS"
export const CREATE_PROFILE_FAILURE = "CREATE_PROFILE_FAIL"

export const createProfileRequest = ()=>{
    return {
        type:CREATE_PROFILE_REQUEST
    }
}

export const createProfileSuccess = (newProfile)=>{
    return {
        type:CREATE_PROFILE_SUCCESS,
        payload:newProfile
    }
}

export const createProfileFailure = (err)=>{
    return {
        type:CREATE_PROFILE_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
