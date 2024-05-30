// 时间格式化  DD-MM-DD hh:mm:ss
function formatDate(time) {
  let _time = new Date(time)

  let Y = _time.getFullYear()
  let M = _time.getMonth() + 1
  let D = _time.getDate()
  return `${Y}年${startWith(M)}月${startWith(D)}日`
}

// 前面补0
function startWith(num) {
  return num >= 10 ? num : '0' + num
}
