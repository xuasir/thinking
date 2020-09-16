module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    // 模板代码强制规则
    // 强制 html > 开辟新行
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    // <img src="a" />
    'vue/html-closing-bracket-spacing': [
      2,
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    // html 缩进
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: []
      }
    ],
    // 属性必须使用双引号
    'vue/html-quotes': [2, 'double'],
    // {{ a }} 空格必须有
    'vue/mustache-interpolation-spacing': [2, 'always'],
    // 属性等号前后不能出现空格
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    // 三种绑定风格采用简写
    'vue/v-bind-style': [2, 'shorthand'],
    'vue/v-on-style': [2, 'shorthand'],
    'vue/v-slot-style': [2, 'shorthand'],
    // 组件强制 kebaba-case
    'vue/component-name-in-template-casing': [
      2,
      'kebab-case',
      {
        registeredComponentsOnly: false
      }
    ],
    // 不允许内联的静态样式
    'vue/no-static-inline-styles': [
      2,
      {
        allowBinding: false
      }
    ],

    // 选项相关 强制规则
    // 单文件书写顺序
    'vue/component-tags-order': [
      2,
      {
        order: [['template', 'script'], 'style']
      }
    ],
    // 单文件组件块中必须要有 空行
    'vue/padding-line-between-blocks': [2, 'always'],
    // 组件选项顺序
    'vue/order-in-components': [
      2,
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    // 必须要有 name选项
    'vue/require-name-property': 2,
    // 属性选项 小驼峰
    'vue/prop-name-casing': [2, 'camelCase'],
    'vue/require-default-prop': 2,
    'vue/require-prop-types': 2,
    // 强制大驼峰定义组件名
    'vue/component-definition-name-casing': [2, 'PascalCase']
    // 不允许没有使用的 属性 数据 计算属性 方法
    // 'vue/no-unused-properties': [
    //   2,
    //   {
    //     groups: ['props', 'data', 'computed', 'methods']
    //   }
    // ]
  }
}
