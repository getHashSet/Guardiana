const test_reducer = (state = true, action) => {
    switch (action.type) {
        case 'TEST':
            return action.payload;
        default:
            return state;
    };
};

export default test_reducer;