// var isSubsequence = function(s, t) {
//   const tlen = t.length
//   const slen = s.length
//   if(tlen < slen || (tlen === 0 && slen !== 0)) return false

//   let ts = -1
//   let matchLen = 0
//   for(let i = 0; i < slen; i ++) {
//     let subIndex = ts < tlen ? ts + 1 : tlen - 1
//     let findt = t.substring(subIndex).indexOf(s[i])
//     if(findt < 0) {
//       return false
//     } else {
//       matchLen++
//       ts = ts + findt + 1
//     }
//   }

//   return matchLen === slen
// };

var isSubsequence = function (s, t) {
  const tlen = t.length
  const slen = s.length
  let i = 0,
    j = 0
  while (i < slen && j < tlen) {
    if (s[i] == t[j]) {
      i++
    }
    j++
  }

  return i === slen
}

console.log(isSubsequence('aaaa', 'bbaaaa'))
