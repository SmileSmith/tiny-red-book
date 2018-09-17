const now = new Date();


function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getNewDate() {
  const y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  if (m < 10) {
    m = `0${m}`;
  }
  if (d < 10) {
    d = `0${d}`;
  }
  return y + m + d;
}

module.exports = {
  timeout,
  getNewDate,
  nowDate: getNewDate(),
};
