/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} [arr=[]] arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr = [], param = "asc") {
  const derections = {
    asc: 1,
    desc: -1,
  };

  const derection = derections[param];

  return [...arr].sort((string1, string2) => {
    return (
      derection *
      string1.localeCompare(string2, ["ru", "en"], { caseFirst: "upper" })
    );
  });

}
