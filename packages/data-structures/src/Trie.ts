import { TrieNode } from './helper/basic'
export class Trie {
  private sz = 0
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  size(): number {
    return this.sz
  }

  add(word: string): void {
    let cur = this.root
    const len = word.length
    for (let i = 0; i < len; i++) {
      const c = word.charAt(i)
      let next = cur.next.get(c)
      if (!next) cur.next.set(c, (next = new TrieNode()))
      cur = next
    }
    if (!cur.isWord) {
      cur.isWord = true
      this.sz++
    }
  }

  contain(word: string): boolean {
    let cur = this.root
    const len = word.length
    for (let i = 0; i < len; i++) {
      const c = word.charAt(i)
      const next = cur.next.get(c)
      if (!next) return false
      cur = next
    }
    return cur.isWord
  }

  isPrefix(prefix: string): boolean {
    let cur = this.root
    const len = prefix.length
    for (let i = 0; i < len; i++) {
      const c = prefix.charAt(i)
      const next = cur.next.get(c)
      if (!next) return false
      cur = next
    }
    return true
  }
}
