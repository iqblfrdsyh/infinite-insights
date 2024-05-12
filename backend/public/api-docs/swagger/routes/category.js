module.exports = {
  "/categories": {
    get: {
      tags: ["API Category"],
      summary: "Get all categories",
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        404: {
          description: "Data blog not found",
        },
      },
    },
  },
  "/category/create": {
    post: {
      tags: ["API Category"],
      summary: "Create new category",
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                },
              },
              required: ["category"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Category Created",
        },
        400: {
          description: "Bad Request",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
  "/category/delete": {
    delete: {
      tags: ["API Category"],
      summary: "Delete a category by ID",
      parameters: [
        {
          name: "categoryId",
          in: "query",
          required: true,
          description: "ID of the category to delete",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "OK",
        },
        404: {
          description: "Data category not found",
        },
      },
    },

  },
};
