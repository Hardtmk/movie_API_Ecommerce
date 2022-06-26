
date = new Date("2022-04-28T00:00:00Z");
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();
time= date.getTime()
console.log(time)
if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

console.log(year+'-' + month + '-'+dt);

const event = new Date('2022-04-28');
console.log(event.toISOString());