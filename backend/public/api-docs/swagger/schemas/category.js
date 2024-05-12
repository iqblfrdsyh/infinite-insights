module.exports = {
  categorySchema: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      category: {
        type: "string",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
