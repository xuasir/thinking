// problem: https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/

var CQueue = function () {
  this.eq = []
  this.dq = []
}

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  if (this.eq.length < 1) {
    while (this.dq.length) {
      this.eq.push(this.dq.pop())
    }
  }
  this.eq.push(value)
}

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.dq.length < 1 && this.eq.length < 1) return -1
  if (this.dq.length < 1) {
    while (this.eq.length) {
      this.dq.push(this.eq.pop())
    }
  }
  return this.dq.pop()
}

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

// 优化版
var CQueue = function () {
  this.eq = []
  this.dq = []
  this.size = 0
}

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.eq.push(value)
  this.size++
}

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.size < 1) return -1
  if (this.dq.length < 1) {
    while (this.eq.length) {
      this.dq.push(this.eq.pop())
    }
  }
  this.size--
  return this.dq.pop()
}
