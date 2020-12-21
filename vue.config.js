module.exports = {
  configureWebpack : {
    resolve : {
      // 别名
      alias: {
        // "@" : "src",
        'assets' : '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        // 在所有的组件中都可以通过this.$router,this.$store所以不需要配置
        'views' : '@/views'
      }
    }
  }
}