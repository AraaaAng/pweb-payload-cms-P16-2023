import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */
const Category = {
  slug: 'Category',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Title',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterOperation: [
      async (args) => {
        let action, logMessage;
  
        if (args.operation === "create") {
          action = "Category Created";
        } else if (args.operation === "deleteByID") {
          action = "Category Deleted";
        } else if (args.operation === "updateByID") {
          action = "Category Updated";
        }
  
        if (action) {
          console.log('Operation:', args.operation);
          await payload.create({
            collection: "Logs",
            data: {
              name: args.result.name,
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

export default Category;