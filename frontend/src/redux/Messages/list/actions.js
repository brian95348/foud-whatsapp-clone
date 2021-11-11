export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST"
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS"
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE"

export const fetchMessagesRequest = ()=>{
    return {
        type:FETCH_MESSAGES_REQUEST
    }
}

export const fetchMessagesSuccess = (messages)=>{
    return {
        type:FETCH_MESSAGES_SUCCESS,
        payload:messages
    }
}

export const fetchMessagesFailure = (err)=>{
    return {
        type:FETCH_MESSAGES_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
