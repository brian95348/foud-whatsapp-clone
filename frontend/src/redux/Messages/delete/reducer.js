import customAxios from '../../axios/axios'
import * as actionCreators from './actions'

const initialState = {
    deleted : false,
    deleteMessagesError: ''
}

const deleteMessagesReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.DELETE_MESSAGES_REQUEST:
            return {
                ...state,
                deleted:true
            };
        case actionCreators.DELETE_MESSAGES_SUCCESS:
            return {
                ...state,
                deleted:true,
                deleteMessagesError:''
            };
        case actionCreators.DELETE_MESSAGES_FAILURE:
            return {
                ...state,
                deleted:false,
                deleteMessagesError:action.payload,
            };
        default:
            return state;
    }
}

export const deleteMessages = (messages,token) => async (dispatch) => {
    dispatch(actionCreators.deleteMessagesRequest())
    try {
        const {data} = await customAxios.post("/chat/delete/",messages,
                            {headers: {token: `Bearer ${token}`}});
        dispatch(actionCreators.deleteMessagesSuccess(data))
    } catch (error) {
        dispatch(actionCreators.deleteMessagesFailure(error))
    }      
}


export default deleteMessagesReducer