const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

// eslint-disable-next-line default-param-last
const counterReducer = (state = initialState, action) => {
  // eslint-disable-next-line no-console
  console.log(action);
  switch (action.type) {
    case 'GOOD': {
      const newState = {
        ...state,
        good: state.good + 1,
      };
      return newState;
    }
    case 'OK': {
      const newState = {
        ...state,
        ok: state.ok + 1,
      };
      return newState;
    }
    case 'BAD': {
      const newState = {
        ...state,
        bad: state.bad + 1,
      };
      return newState;
    }

    case 'ZERO':
      return initialState;
    default: return state;
  }
};

export default counterReducer;
