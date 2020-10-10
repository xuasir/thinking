import { UF } from '../src'

describe('test union find ', () => {
  test('test UF ', () => {
    const uf = new UF(10)
    expect(uf.find(1)).toBe(1)
    expect(uf.find(3)).toBe(3)
    uf.union(1, 3)
    expect(uf.find(1)).toBe(1)
    expect(uf.find(3)).toBe(1)
    expect(uf.isConnection(1, 3)).toBeTruthy()
    uf.union(1, 4)
    expect(uf.isConnection(3, 4)).toBeTruthy()
  })
})
