export const SAVE_PRICE_DESCRIPTION = 'SAVE_PRICE_DESCRIPTION';
export const SAVE_PRICE_DESCRIPTION_COMPLETE = 'SAVE_PRICE_DESCRIPTION_COMPLETE';

export const priceDescriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PRICE_DESCRIPTION:
      return action.payload;
    default:
      return state;
  }
};


export const SAVE_PRICE_AMOUNT = 'SAVE_PRICE_AMOUNT';
export const SAVE_PRICE_AMOUNT_COMPLETE = 'SAVE_PRICE_AMOUNT_COMPLETE';

export const priceAmountReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PRICE_AMOUNT:
      return action.payload;
    default:
      return state;
  }
};

