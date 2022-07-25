const usersReducer = (state=[],action) => {
    switch(action.type){
        case "FETCH_USERS":
            return action.payload;
        case "UPDATE_CURRENT_USER":
            return state.map((stat) => stat._id === action.payload._id ? action.payload : stat)
        default:
            return state;
    }
}

export default usersReducer;