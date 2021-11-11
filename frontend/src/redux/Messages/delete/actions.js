export const DELETE_MESSAGES_REQUEST = "DELETE_MESSAGES_REQUEST"
export const DELETE_MESSAGES_SUCCESS = "DELETE_MESSAGES_SUCCESS"
export const DELETE_MESSAGES_FAILURE = "DELETE_MESSAGES_FAILURE"

export const deleteMessagesRequest = ()=>{
    return {
        type:DELETE_MESSAGES_REQUEST
    }
}

export const deleteMessagesSuccess = ()=>{
    return {
        type:DELETE_MESSAGES_SUCCESS,
    }
}

export const deleteMessagesFailure = (err)=>{
    return {
        type:DELETE_MESSAGES_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
