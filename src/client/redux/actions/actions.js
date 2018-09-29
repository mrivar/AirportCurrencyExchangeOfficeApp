import * as types from "../constants/action-types";

export const changeAdminConfig = (refreshEveryInSeconds, commissionPct, surcharge, minCommission, marginPct) => ({
  type: types.CHANGE_ADMIN_CONFIG,
  refreshEveryInSeconds,
  commissionPct,
  surcharge,
  minCommission,
  marginPct,
});