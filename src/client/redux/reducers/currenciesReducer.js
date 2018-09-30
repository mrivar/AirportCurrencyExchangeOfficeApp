import * as types from "../constants/action-types";
import CONFIG from '../../data/config.json';

// Create currency dictionary & currency API list
const dict = {};
let API_currencies = "";
CONFIG.currencies.forEach((currency) => {
  dict[currency.name] = currency;
  dict[currency.name].balance = currency.initialBalance;
  API_currencies += `${currency.name},`;
});

const initialState = {
  success: CONFIG.success,
  homeCurrency: CONFIG.homeCurrency,
  API_access_key: CONFIG.API_access_key,
  API_timestamp: new Date(),
  API_currencies: API_currencies.slice(0, -1),
  currencies: dict
}

const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENCY:
      const new_currencies = {...state.currencies};
      new_currencies[action.key].balance = action.balance;
      return {
        ...state,
        currencies: new_currencies,
      };
    case types.UPDATE_EXCHANGE_RATES:
      return {
        ...state,
        currencies: action.currencies,
        success: action.success,
        API_timestamp: action.API_timestamp
      };
    case types.UPDATE_EXCHANGE_RATES_FAILED:
      return {
        ...state,
        success: action.success
      };
    case types.CHANGE_HOME_CURRENCY:
      return {
        ...state,
        homeCurrency: action.homeCurrency,
      };
    case types.CHANGE_API_ACCESS_KEY:
      return {
        ...state,
        API_access_key: action.API_access_key,
      };
    default:
      return state;
  }
};

export default currenciesReducer;