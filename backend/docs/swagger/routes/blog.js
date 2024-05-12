module.exports = {
  "/blogs": {
    get: {
      tags: ["API Blog"],
      summary: "Get all blogs",
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
  "/blog": {
    get: {
      tags: ["API Blog"],
      summary: "Get blog by ID",
      produces: ["application/json"],
      security: [{ accessToken: [] }],
      parameters: [
        {
          name: "blogId",
          in: "query",
          required: true,
          description: "ID of the blog to retrieve",
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
          description: "Data blog not found",
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              example: {
                error: "Unauthorized",
                message: "Missing or invalid token",
              },
            },
          },
        },
      },
    },
  },
  "/blog/category": {
    get: {
      tags: ["API Blog"],
      summary: "Get blogs by category",
      produces: ["application/json"],
      parameters: [
        {
          name: "category",
          in: "query",
          required: true,
          description: "Category name to filter blogs",
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
          description: "Data blog not found",
        },
      },
    },
  },
  "/blogs/search": {
    get: {
      tags: ["API Blog"],
      summary: "Search blogs",
      produces: ["application/json"],
      parameters: [
        {
          name: "query",
          in: "query",
          required: true,
          description: "Keyword to search blogs",
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
          description: "No search results found",
        },
      },
    },
  },
  "/blog/create": {
    post: {
      tags: ["API Blog"],
      summary: "Create a new blog",
      security: [{ accessToken: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                categoryId: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                },
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                thumbnail: {
                  type: "string",
                  format: "binary",
                },
                author: {
                  type: "string",
                },
                source_link: {
                  type: "string",
                },
                status: {
                  type: "string",
                  enum: ["Published", "Archived"],
                },
              },
              required: ["categoryId", "title", "content", "status"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Blog created",
        },
        400: {
          description: "Bad request",
        },
      },
    },
  },
  "/blog/update": {
    put: {
      tags: ["API Blog"],
      summary: "Update a blog by ID",
      consumes: ["application/json"],
      parameters: [
        {
          name: "blogId",
          in: "query",
          required: true,
          description: "ID of the blog to update",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                categoryId: {
                  type: "string",
                  description: "Change categories for blog, Example: 1, 2, 5",
                },
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                thumbnail: {
                  type: "string",
                  format: "binary",
                },
                author: {
                  type: "string",
                },
                source_link: {
                  type: "string",
                },
                status: {
                  type: "string",
                  enum: ["Published", "Archived"],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad request",
        },
        404: {
          description: "Data blog not found",
        },
      },
    },
  },
  "/blog/delete": {
    delete: {
      tags: ["API Blog"],
      summary: "Delete a blog by ID",
      parameters: [
        {
          name: "blogId",
          in: "query",
          required: true,
          description: "ID of the blog to delete",
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
          description: "Data blog not found",
        },
      },
    },
  },
};
