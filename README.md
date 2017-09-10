# PostCSS-DSS ![build status](https://travis-ci.org/benmcginnis/postcss-dss.svg?branch=master)

**PostCSS-DSS** is a **[PostCSS](http://postcss.org/)** plugin that generates UI documentation from CSS files based on the output from **[DSS](https://github.com/darcyclarke/dss)**.

## Getting started
See **[PostCSS on Github](https://github.com/postcss/postcss)** for how to get started with PostCSS.

**Installation**: `npm install postcss-dss --save`  or `yarn add postcss-dss`

### Plugin Usage

With **Webpack** via [postcss-loader](https://github.com/postcss/postcss-loader):

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('postcss-dss', {
                    fileName: 'styles.json'
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Settings
**fileName**

Type: `string`

Name of output file for styles documention.

**parsers**

Type: `array` of objects in the format: `{
  atRule: 'name',
  func: function(){}
}`

**Example Custom Parser Config**

See [DSS Readme](https://github.com/DSSWG/DSS) for more information on custom parsers.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('postcss-dss', {
                    fileName: 'styles.json',
                    parsers: [
                      {
                        atRule: 'version',
                        func: function () {
                          return this.line.contents;
                        }
                      }
                    ]
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```
