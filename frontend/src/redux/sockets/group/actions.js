export const SEND_GROUP_MESSAGE_REQUEST = "SEND_GROUP_MESSAGE_REQUEST"
export const UPDATE_GROUP_CHAT_LOG = "UPDATE_GROUP_CHAT_LOG"

export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST"
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS"
export const CREATE_GROUP_ERROR = "CREATE_GROUP_ERROR"

export function createGroupRequest(){
    return {
        type: CREATE_GROUP_REQUEST
    }
}

export function createGroupSuccess(payload){
    return {
        type: CREATE_GROUP_SUCCESS,
        payload
    }
}

export function createGroupError(error){
    return {
        type: CREATE_GROUP_ERROR,
        error
    }
}



