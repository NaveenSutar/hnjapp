import {types} from '..';

const initialState = {
  token: null,
  id: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return {
        token: action.payload.token,
        id: action.payload.id,
        didTryAutoLogin: true,
      };
    case types.SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case types.LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
