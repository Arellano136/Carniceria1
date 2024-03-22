export const authManager = (state = {signed: false},action) =>{
    switch (action.type) {
        case "SIGNIN":
            return {
                ...action.payload,
                signed: false,
            }
        case "SIGNOUT":
            return {
                ...action.payload,
                signed: true
            }
        default:
            return state;
    }
}