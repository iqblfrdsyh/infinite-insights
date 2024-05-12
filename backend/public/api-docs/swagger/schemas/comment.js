module.exports = {
    commentSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        commentar: {
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
  