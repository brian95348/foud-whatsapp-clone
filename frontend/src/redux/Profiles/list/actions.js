export const FETCH_PROFILES_REQUEST = "FETCH_PROFILES_REQUEST"
export const FETCH_PROFILES_SUCCESS = "FETCH_PROFILES_SUCCESS"
export const FETCH_PROFILES_FAILURE = "FETCH_PROFILES_FAILURE"

export const fetchProfilesRequest = ()=>{
    return {
        type:FETCH_PROFILES_REQUEST
    }
}

export const fetchProfilesSuccess = (profiles)=>{
    return {
        type:FETCH_PROFILES_SUCCESS,
        payload:profiles
    }
}

export const fetchProfilesFailure = (err)=>{
    return {
        type:FETCH_PROFILES_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
