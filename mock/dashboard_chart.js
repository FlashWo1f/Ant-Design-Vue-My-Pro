function chart(method) {
  let res = null
  switch (method) {
    case 'GET':
      res = [180, 200, 150, 80, 70, 110, 130]
      break;
    default:
      res = null;
  }
  return res
}

module.exports = chart