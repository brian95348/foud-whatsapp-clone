import axios from 'axios'
import * as actionCreators from './actions'

export function createGroup(groupName) {
    return async function (dispatch) {
        dispatch(actionCreators.createGroupRequest());
        try{
            const response = await axios.get(`/group?name=${groupName}`)
            dispatch(actionCreators.createGroupSuccess(response.data));
        }catch(error){
            dispatch(actionCreators.createGroupError(error));
        }
    }
}