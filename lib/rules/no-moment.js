module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "disallow importing or requiring Moment.js",
        category: "Best Practices",
        recommended: true
      },
      schema: [] // no options
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          if (node.source.value === "moment") {
            context.report({
              node,
              message: "Importing Moment.js is forbidden. Use date-fns or Luxon instead."
            });
          }
        },
        CallExpression(node) {
          if (
            node.callee.name === "require" &&
            node.arguments.length === 1 &&
            node.arguments[0].value === "moment"
          ) {
            context.report({
              node,
              message: "Requiring Moment.js is forbidden. Use date-fns or Luxon instead."
            });
          }
        }
      };
    }
  };
  