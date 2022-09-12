export const test = bool => {
    return {
        type: 'TEST',
        payload: bool
    };
};