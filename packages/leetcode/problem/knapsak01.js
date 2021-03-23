// 0-1背包

function knapsak01(w, v, C) {
  const len = w.length
  if (len === 0) return 0

  const memo = Array.from({ length: len }).map(() =>
    Array.from({ length: C + 1 }).fill(-1)
  )

  memo[0].forEach((_, i) => (i >= w[0] ? v[0] : 0))

  for (let i = 1; i < len; i++) {
    for (let j = 0; j <= C; j++) {
      memo[i][j] = memo[i - 1][j]
      if (j >= w[j]) {
        memo[i][j] = Math.max(memo[i][j], v[i] + memo[i - 1][j - w[i]])
      }
    }
  }

  return memo[len - 1][C]
}

// 空间压缩

function knapsak01_2(w, v, C) {
  const len = w.length
  if (len === 0) return 0

  const memo = Array.from({ length: 2 }).map(() =>
    Array.from({ length: C + 1 }).fill(-1)
  )

  memo[0].forEach((_, i) => (i >= w[0] ? v[0] : 0))

  for (let i = 1; i < len; i++) {
    for (let j = 0; j <= C; j++) {
      memo[i % 2][j] = memo[(i - 1) % 2][j]
      if (j >= w[j]) {
        memo[i % 2][j] = Math.max(
          memo[i % 2][j],
          v[i] + memo[(i - 1) % 2][j - w[i]]
        )
      }
    }
  }

  return memo[1][C]
}
