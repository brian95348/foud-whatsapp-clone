

export function createGroup(groupName) {
    return async function (dispatch) {
        dispatch(createGroupRequest());
        try{
            const response = await axios.get(`${API_BASE}/group?name=${groupName}`)
            dispatch(createGroupSuccess(response.data));
        }catch(error){
            dispatch(createGroupError(error));
        }
    }
}