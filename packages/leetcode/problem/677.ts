// problem: https://leetcode-cn.com/problems/map-sum-pairs/

class TrieNode {
  value: number
  next: Map<string, TrieNode>
  constructor(value = 0) {
    this.value = value
    this.next = new Map()
  }
}

class MapSum {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(key: string, val: number): void {
    let cur = this.root
    const len = key.length
    for (let i = 0; i < len; i++) {
      const c = key.charAt(i)
      let next = cur.next.get(c)
      if (!next) cur.next.set(c, (next = new TrieNode()))
      cur = next
    }
    cur.value = val
  }

  sum(prefix: string): number {
    let cur = this.root
    const len = prefix.length
    for (let i = 0; i < len; i++) {
      const c = prefix.charAt(i)
      const next = cur.next.get(c)
      if (!next) return 0
      cur = next
    }

    return this._sum(cur)
  }

  private _sum(node: TrieNode): number {
    let sum = node.value
    for (const [_, next] of node.next) {
      sum += this._sum(next)
    }
    return sum
  }
}
