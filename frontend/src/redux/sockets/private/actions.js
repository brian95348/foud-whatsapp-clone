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




export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"

export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"

export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"


export function joinRoomRequest(){

    return {

        type: JOIN_ROOM_REQUEST

    }

}


export function joinRoomSuccess(payload){

    return {

        type: JOIN_ROOM_SUCCESS,

        payload

    }

}


export function joinRoomError(error){

    return {

        type: JOIN_ROOM_ERROR,

        error

    }

}


export function joinRoom(roomId) {

    return async function (dispatch) {

        dispatch(joinRoomRequest());

        try{

            const response = await axios.get(`${API_BASE}/room/${roomId}`)

            dispatch(joinRoomSuccess(response.data));

        }catch(error){

            dispatch(joinRoomError(error));

        }

    }

}


export const SET_USERNAME = "SET_USERNAME"


export function setUsername(username){

    return {

        type: SET_USERNAME,

        username

    }

}