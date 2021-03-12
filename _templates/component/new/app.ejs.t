---
inject: true
to: client/src/App.scss
append: true
---
@import "./components/<%= name %>/<%= h.changeCase.paramCase(name) %>.scss";