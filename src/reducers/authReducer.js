export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SAVE_PROFILE_COMPLETE = 'SAVE_PROFILE_COMPLETE';

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

export const SAVE_USER = 'SAVE_USER';
export const SAVE_USER_COMPLETE = 'SAVE_USER_COMPLETE';

export const saveUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER:
      return action.payload;
    default:
      return state;
  }
};
