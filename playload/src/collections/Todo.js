const payload = require('payload')

/** @type {import('payload/types').CollectionConfig} */
const Todo = {
  slug: "Todo",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "categories", 
      type: "relationship",
      relationTo: "Category",
      hasMany: false,
    },
  ],
  hooks: {
    afterOperation: [
      async (args) => {
        let action, logMessage;
  
        if (args.operation === "create") {
          action = "Todo Created";
          logMessage = args.result.title;
        } else if (args.operation === "deleteByID") {
          action = "Todo Deleted";
          logMessage = args.result.title;
        } else if (args.operation === "updateByID") {
          action = "Todo Updated";
          logMessage = args.result.title;
        }
  
        if (action) {
          console.log('Operation:', args.operation);
          await payload.create({
            collection: "Logs",
            data: {
              name: logMessage,
              log: args.result.id,
              timestamp: new Date(),
              action: action,
            },
          });
        }
      },
    ],
  },  
};
export default Todo;