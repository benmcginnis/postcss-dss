const postcss = require('postcss');
const fs = require('fs');
const plugin = require('./');
const testdataDir = 'testdata';

if (!fs.existsSync(testdataDir)) {
    fs.mkdirSync(testdataDir);
}

function run(input, output, opts) {
    return postcss([plugin(opts)])
    .process(input)
    .then(result => {
        let out = fs.readFileSync(opts.fileName, 'utf-8');
        expect(out).toEqual(output);
        expect(result.warnings().length).toBe(0);
    });
}


it('parses DSS comments and saves them to specified output file', () => {
    let input = `/*
* @name Button
* @description Your standard form button.
*
* @state :hover - Highlights when hovering.
* @state .smaller - A smaller button
*
* @markup
*   <button>This is a button</button>
*/`;
    let output = `{
  "blocks": [
    {
      "name": "Button",
      "description": "Your standard form button.",
      "state": [
        [
          {
            "name": ":hover",
            "escaped": "pseudo-class-hover",
            "description": "Highlights when hovering."
          }
        ],
        [
          {
            "name": ".smaller",
            "escaped": "smaller",
            "description": "A smaller button"
          }
        ]
      ],
      "markup": [
        {
          "example": "   <button>This is a button</button>",
          "escaped": "   &lt;button&gt;This is a button&lt;/button&gt;"
        }
      ]
    }
  ]
}`;

    return run(input, output, { fileName: 'testdata/basic_styles.json' });
});


it('accepts custom parsers', () => {
    return run('/* @version 1.0 */', `{
  "blocks": [
    {
      "version": "1.0"
    }
  ]
}`, {
    fileName: 'testdata/custom_parser.json',
    parsers: [
        {
            atRule: 'version',
            func: function () {
                return this.line.contents;
            }
        }
    ]
});
});
