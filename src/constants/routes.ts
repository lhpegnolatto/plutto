export const routes = {
  SIGN_IN: "/sign-in",
  HOME: "/home",
  TRANSACTIONS: "/transactions",
  NEW_TRANSACTION: "/transactions/new",
  EDIT_TRANSACTION: "/transactions/edit/{transactionId}",
};

export function addRouteParam(
  route: string,
  params: { [key: string]: string }
) {
  let routeWithParams = route;

  const paramsKeys = Object.keys(params);
  paramsKeys.forEach((key) => {
    routeWithParams = routeWithParams.replace(`{${key}}`, params[key]);
  });

  return routeWithParams;
}
