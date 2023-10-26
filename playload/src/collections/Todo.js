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
      name: "categories", // Field ini akan menjadi kunci asing
      type: "relationship",
      relationTo: "Category", // Merujuk ke koleksi Category
      hasMany: false,
    },
  ],
};

export default Todo;
