---
to: client/src/screens/<%= name %>/_<%= h.changeCase.paramCase(name) %>.scss
unless_exists: true
---
@import "../../sass/variables";

.<%= h.changeCase.paramCase(name) %> {

}
