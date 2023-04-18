export function getTranslatedErrorMessage(t: any, error: string | undefined) {
  if (!error) {
    return undefined;
  }

  return t(error);
}
