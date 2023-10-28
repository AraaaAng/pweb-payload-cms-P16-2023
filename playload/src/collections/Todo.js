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
        if (args.operation === "create") {
          console.log('Operation:', args.operation);
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.title,
              log: args.result.id,
              timestamp: new Date(),
              action: "Todo Created",
            },
          });
        } else if (args.operation === "deleteByID") {
          console.log('Operation:', args.operation);
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
              log: args.result.id,
              timestamp: new Date(),
              action: "Todo Deleted",
            },
          });
        } else if (args.operation === "updateByID") {
          console.log('Operation:', args.operation);
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
              log: args.result.id,
              timestamp: new Date(),
              action: "Todo Updated",
            },
          });
        }
      },
    ],
  },
};
export default Todo;