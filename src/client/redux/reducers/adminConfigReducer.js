import * as types from "../constants/action-types";
import CONFIG from '../../data/config.json';

const initialState = {
  refreshEveryInSeconds: CONFIG.refreshEveryInSeconds,
  commissionPct: CONFIG.commissionPct,
  surcharge: CONFIG.surcharge,
  minCommission: CONFIG.minCommission,
  marginPct: CONFIG.marginPct
}

const adminConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ADMIN_CONFIG:
      return {
        ...state,
        refreshEveryInSeconds: action.refreshEveryInSeconds,
        commissionPct: action.commissionPct,
        surcharge: action.surcharge,
        minCommission: action.minCommission,
        marginPct: action.marginPct
      };
    default:
      return state;
  }
};

export default adminConfigReducer;