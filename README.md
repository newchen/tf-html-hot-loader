## 处理html热加载

在rules中

```
{
    test: /\.js$/,
    include: config.srcPath,
    exclude: config.dll.outputPath,
    use:[{
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-0'],
            cacheDirectory: true
        }
    }, {
        // 参考：https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload
        loader: 'tf-html-hot-loader',
        options: {
            files: entries, // 这是入口文件对象或数组
            content: function() {
                return (
                    "if (process.env.NODE_ENV !== 'production') {\n" +
                        "require('./" + config.contentPageName + "')\n" +
                    "}"
                )
            }
        }
    }]
}

```