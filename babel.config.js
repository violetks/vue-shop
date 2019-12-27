// 发布阶段用的 babel 插件
const prodPlugins = []
if (ProgressEvent.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [...prodPlugins]
}
