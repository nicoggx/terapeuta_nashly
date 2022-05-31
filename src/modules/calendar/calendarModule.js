const INITIAL_STATE = {
    stepOne: {
        isValidate: false,
        isContinuous: false,
        isVisible: true,
    },
    stepTwo: {
        isValidate: false,
        isContinuous: true,
        isVisible: false,
    },
    stepThree: {
        isValidate: false,
        isContinuous: true,
        isVisible: false,
    },
    stepFour: {
        isValidate: false,
        isContinuous: true,
        isVisible: false,
    },
    currentStep: 1,
};

export const ACTIONS = {
    SET_STEP_ONE: 'SET_STEP_ONE',
    SET_STEP_TWO: 'SET_STEP_TWO',
    SET_STEP_THREE: 'SET_STEP_THREE',
    SET_STEP_FOUR: 'SET_STEP_FOUR',
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',
};

const getStep = (active, viewed) => {
    if (active) {
        return {
            isValidate: true,
            isContinuous: false,
            isVisible: false,
        };
    }
    if (!active && viewed) {
        return {
            isValidate: true,
            isContinuous: false,
            isVisible: false,
        };
    }
    if (!active && !viewed) {
        return {
            isValidate: false,
            isContinuous: true,
            isVisible: false,
        };
    }
    return {};
};

export const calendarReducer = (state = INITIAL_STATE, action = {}) => {
    if (action.type === ACTIONS.SET_STEP_ONE)
        return {
            ...state,
            stepOne: getStep(true, false),
            stepTwo: getStep(false, false),
            stepThree: getStep(false, false),
            stepFour: getStep(false, false),
        };

    if (action.type === ACTIONS.SET_STEP_TWO)
        return {
            ...state,
            stepOne: getStep(false, true),
            stepTwo: getStep(true, false),
            stepThree: getStep(false, false),
            stepFour: getStep(false, false),
        };

    if (action.type === ACTIONS.SET_STEP_THREE)
        return {
            ...state,
            stepOne: getStep(false, true),
            stepTwo: getStep(false, true),
            stepThree: getStep(true, false),
            stepFour: getStep(false, true),
        };

    if (action.type === ACTIONS.SET_STEP_FOUR)
        return {
            ...state,
            stepOne: getStep(false, true),
            stepTwo: getStep(false, true),
            stepThree: getStep(false, true),
            stepFour: getStep(true, false),
        };

    if (action.type === ACTIONS.SET_CURRENT_STEP)
        return {
            ...state,
            currentStep: action.payload,
        };
    return state;
};

export const setStepOne = () => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_STEP_ONE,
    });
};

export const setStepTwo = () => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_STEP_TWO,
    });
};

export const setStepThree = () => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_STEP_THREE,
    });
};

export const setStepFour = () => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_STEP_FOUR,
    });
};

export const setCurrentStep = (step) => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_CURRENT_STEP,
        payload: step,
    });
};
