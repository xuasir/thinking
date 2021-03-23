// problem: https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
class TrieNode {
  isWord: boolean
  next: Map<string, TrieNode>
  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map()
  }
}

class WordDictionary {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  addWord(word: string): void {
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
    }
  }

  search(word: string): boolean {
    return this.match(word, this.root, 0)
  }

  private match(word: string, node: TrieNode, index: number): boolean {
    if (index === word.length) return node.isWord

    const c = word.charAt(index)
    if (c !== '.') {
      const next = node.next.get(c)
      if (!next) return false
      return this.match(word, next, index + 1)
    }

    for (const [_, next] of node.next) {
      if (this.match(word, next, index + 1)) return true
    }
    return false
  }
}
