let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let remplated = "2018-08-22".replace(re, '$<day>/$<month>/$<year>')
console.log(remplated);
template = "2018-08-22".replace(re, (
  matched,
  capture1,
  capture2,
  capture3,
  position,
  S,
  groups,
) => {
  let { day, month, year }= groups;
  return `${day}/${month}/${year}`
})
console.log(remplated);
