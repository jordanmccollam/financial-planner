---
inject: true
to: client/src/App.scss
append: true
---
@import "./screens/<%= name %>/<%= h.changeCase.paramCase(name) %>.scss";