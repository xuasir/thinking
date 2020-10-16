import { Trie } from '../src'

describe('test trie ', () => {
  test('add word search and prefix ', () => {
    const t = new Trie()
    t.add('hello')
    t.add('world')
    expect(t.size()).toBe(2)
    t.add('all')
    t.add('trie')
    t.add('trie')
    expect(t.size()).toBe(4)

    // contain
    expect(t.contain('all')).toBeTruthy()
    expect(t.contain('a')).toBeFalsy()
    expect(t.contain('trie')).toBeTruthy()
    expect(t.contain('hello')).toBeTruthy()
    expect(t.contain('world')).toBeTruthy()

    // prefix
    expect(t.isPrefix('a')).toBeTruthy()
    expect(t.isPrefix('al')).toBeTruthy()
    expect(t.isPrefix('hell')).toBeTruthy()
  })
})
