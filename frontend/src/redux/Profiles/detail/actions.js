export const FETCH_PROFILE_DETAIL_REQUEST = "FETCH_PROFILE_DETAIL_REQUEST"
export const FETCH_PROFILE_DETAIL_SUCCESS = "FETCH_PROFILE_DETAIL_SUCCESS"
export const FETCH_PROFILE_DETAIL_FAILURE = "FETCH_PROFILE_DETAIL_FAILURE"

export const fetchProfileDetailRequest = ()=>{
    return {
        type:FETCH_PROFILE_DETAIL_REQUEST
    }
}

export const fetchProfileDetailSuccess = (profile)=>{
    return {
        type:FETCH_PROFILE_DETAIL_SUCCESS,
        payload:profile
    }
}

export const fetchProfileDetailFailure = (err)=>{
    return {
        type:FETCH_PROFILE_DETAIL_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
