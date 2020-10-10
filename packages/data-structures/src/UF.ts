export class UF {
  private parents: number[] = []
  private sz = 0
  private rank: number[] = []
  constructor(capacity: number) {
    this.sz = capacity
    this.rank = Array.from({ length: capacity }).fill(1) as number[]
    this.parents = Array.from({ length: capacity }).map((_, i) => i)
  }

  size(): number {
    return this.sz
  }

  find(target: number): number {
    if (target !== this.parents[target])
      this.parents[target] = this.find(this.parents[target])
    return this.parents[target]
  }

  isConnection(q: number, p: number): boolean {
    q = this.find(q)
    p = this.find(p)
    return q === p
  }

  union(q: number, p: number): void {
    const qRoot = this.find(q)
    const pRoot = this.find(p)
    if (qRoot === pRoot) return
    if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parents[qRoot] = pRoot
    } else if (this.rank[qRoot] > this.rank[pRoot]) {
      this.parents[pRoot] = qRoot
    } else {
      this.parents[pRoot] = qRoot
      this.rank[qRoot] += 1
    }
  }
}
