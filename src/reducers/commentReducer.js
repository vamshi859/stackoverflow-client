const commmentReducer = (state={comments:null},action) => {
    switch(action.type){
        case "FETCH_ALL_COMMENTS":
            return {...state,comments:action.payload}
        default:
            return state;
    }
}

export default commmentReducer;