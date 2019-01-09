module.exports = {
  install: function(less, pluginManager) {
    pluginManager.addPostProcessor({
      process: function(css) {
        return '/* steal-plugin-test */\n' + css;
      }
    });
  }
}
