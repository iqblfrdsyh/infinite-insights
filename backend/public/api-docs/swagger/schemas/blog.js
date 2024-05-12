module.exports = {
  blogSchema: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      userId: {
        type: "string",
      },
      categoryId: {
        type: "string",
      },
      title: {
        type: "string",
      },
      content: {
        type: "string",
      },
      author: {
        type: "string",
      },
      thumbnail: {
        type: "string",
        format: "binary",
      },
      source_link: {
        type: "string",
      },
      views: {
        type: "number",
      },
      status: {
        type: "string",
        enum: ["Published", "Archived"],
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
