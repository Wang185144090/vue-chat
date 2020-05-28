export default {
  /**
   * 校验字符串是否为空
   * @param str
   */
  isEmpty (str) {
    if (str === undefined || str === 'undefined' || str === null || str === '' || str === [] || str === {} || str.isNaN) {
      return true
    }
    return false
  },
  /**
   * 获取字符串的长度
   * @param str
   */
  strLen (str) {
    let len = 0
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i)
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        len++
      } else {
        len += 2
      }
    }
    return len
  }
}
