import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    messages: [],
    messagesError: ''
}

const chatsReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_MESSAGES_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                loading:false,
                messages:action.payload,
                messagesError:''
            };
        case actionCreators.FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                loading:false,
                messagesError:action.payload,
                messages:[]
            };
        default:
            return state;
    }
}

export const fetchMessages = (chatname,profile_username,token) => async (dispatch) => {
    dispatch(actionCreators.fetchMessagesRequest())
    try {
        const {data} = await customAxios.get(`/chat/${chatname}/`,
                            {headers: {token: `Bearer ${token}`},
                        params:{profile_username}});
        dispatch(actionCreators.fetchMessagesSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchMessagesFailure(error))
    }      
}


export default chatsReducer