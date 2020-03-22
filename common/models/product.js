'use strict';

module.exports = function(Product) {
  Product.afterRemoteError ('*', function (context, next) {    
    delete context.error.stack;
    next();
  });

};
