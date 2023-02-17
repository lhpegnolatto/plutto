export function getDateTimeInputDefaultValue(d = new Date()) {
  const Y = d.getFullYear();
  const m = d.getMonth() + 1;
  const D = d.getDate();
  const H = d.getHours();
  const M = d.getMinutes();

  return (
    Y +
    "-" +
    m.toString().padStart(2, "0") +
    "-" +
    D.toString().padStart(2, "0") +
    "T" +
    H.toString().padStart(2, "0") +
    ":" +
    M.toString().padStart(2, "0")
  );
}
