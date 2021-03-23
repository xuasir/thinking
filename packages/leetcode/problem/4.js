// problem： https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
// 去重复版本
// var findMedianSortedArrays = function (nums1, nums2) {
//   const len1 = nums1.length - 1;
//   const len2 = nums2.length - 1;
//   const res = Array.from({ length: len1 + len2 });
//   let i = 0,
//     l = 0,
//     r = 0;
//   while (l <= len1 && r <= len2) {
//     if (nums1[l] < nums2[r]) {
//       res[i] = nums1[l];
//       while (res[i] === nums1[l]) l++;
//       i++;
//     } else if (nums1[l] > nums2[r]) {
//       res[i] = nums2[r];
//       while (res[i] === nums2[r]) r++;
//       i++;
//     } else {
//       res[i] = nums1[l];
//       while (res[i] === nums1[l]) l++;
//       while (res[i] === nums2[r]) r++;
//       i++;
//     }
//   }

//   if (l <= len1) {
//     for (; l <= len1; ) {
//       res[i] = nums1[l];
//       while (res[i] === nums1[l]) l++;
//       i++;
//     }
//   }
//   if (r <= len2) {
//     for (; r <= len2; ) {
//       res[i] = nums2[r];
//       while (res[i] === nums2[r]) r++;
//       i++;
//     }
//   }

//   if (i % 2 === 0) {
//     return (res[i / 2] + res[i / 2 - 1]) / 2;
//   } else {
//     return res[(i / 2) | 0];
//   }
// };
// 不去重复
var findMedianSortedArrays = function (nums1, nums2) {
  const len1 = nums1.length - 1
  const len2 = nums2.length - 1
  const res = Array.from({ length: len1 + len2 })
  let i = 0,
    l = 0,
    r = 0
  while (l <= len1 && r <= len2) {
    if (nums1[l] < nums2[r]) {
      res[i++] = nums1[l++]
    } else if (nums1[l] > nums2[r]) {
      res[i++] = nums2[r++]
    } else {
      res[i++] = nums1[l++]
      res[i++] = nums2[r++]
    }
  }

  if (l <= len1) {
    for (; l <= len1; ) {
      res[i++] = nums1[l++]
    }
  }
  if (r <= len2) {
    for (; r <= len2; ) {
      res[i++] = nums2[r++]
    }
  }

  if (i % 2 === 0) {
    return (res[i / 2] + res[i / 2 - 1]) / 2
  } else {
    return res[(i / 2) | 0]
  }
}

const res = findMedianSortedArrays(
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
  [1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4]
)
// const res = findMedianSortedArrays([1, 1], [1, 2]);
console.log(res)
