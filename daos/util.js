/**
 * 检测是否存在
 *
 * @param {any} doc
 * @param {any} param
 * @returns
 */
function checkNull(doc, param) {
  if (doc === null) {
    return {
      code: 1002,
      msg: `no [${param}] in db`,
    };
  }
  return doc;
}

/**
 * db错误统一处理
 *
 * @param {any} doc
 * @param {any} param
 * @returns
 */
function dbErr(msg = 'db error') {
  return {
    code: 1001,
    msg,
  };
}


module.exports = {
  checkNull,
  dbErr,
};
