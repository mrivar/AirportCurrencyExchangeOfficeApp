import * as types from "../constants/action-types";

export const changeAdminConfig = (refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct) => ({
  type: types.CHANGE_ADMIN_CONFIG,
  refreshEveryInSeconds,
  commissionPct,
  surcharge,
  minCommission,
  marginPct,
});

export const updateCurrencyBalance = (key, balance) => ({
  type: types.UPDATE_CURRENCY,
  key,
  balance
});

export const updateExchangeRates = (currencies, success, API_timestamp) => ({
  type: types.UPDATE_EXCHANGE_RATES,
  currencies,
  success,
  API_timestamp
});

export const updateExchangeRatesFailed = (success=false) => ({
  type: types.UPDATE_EXCHANGE_RATES_FAILED,
  success
});