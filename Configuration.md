# Configuration

## Prettier

Tslint and Prettier are combine through the [tsling-config-prettier library](https://github.com/prettier/tslint-config-prettier).
**However** there is some [conflicting rules](https://unpkg.com/tslint-config-prettier).

So, the following rules have been disabled :
 - new-parens
 - semicolon *(replace: -> semi)*
 - trailing-comma *(replace: -> trailingComma: es5)*

Previous configs on those:

```
    "semicolon": [true, "always", "ignore-bound-class-methods"],
    "new-parens": true,
    "trailing-comma": [
      true,
      {
        "multiline": {
          "objects": "always",
          "arrays": "always",
          "functions": "never",
          "typeLiterals": "ignore"
        },
        "esSpecCompliant": true
      }
    ],
```
