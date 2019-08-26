// 'use strict' has some limitation:
// 1: paramDefault
function doSomething(a, b= a){
  'use strict';
}
// Uncaught SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

// 2: destructing variables
function doSomething({a= 1, b = 2} = {}){
  'use strict';
  console.log(a+b);
}
// Error the same as the above one

// 3: extensible operator
function doSomething(...values){
  'use strict';
}
// Error: the same as the above one

// resolution one
'use strict';
function doSomething(a, b = a){
  // code
}
// resolution two
const doSomething = (function(){
  'use strict';
  return function(value=42){
    return value;
  }
}());

