module.exports = {
  "/comments": {
    get: {
      tags: ["API Commentar"],
      summary: "Get all commentar",
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        404: {
          description: "data commentar not found",
        },
      },
    },
  },
  "/comment/create": {
    post: {
      tags: ["API Commentar"],
      summary: "Create new Commentar",
      security: [{ accessToken: [] }],
      parameters: [
        {
          name: "blogId",
          in: "query",
          required: true,
          description: "ID of the blog to post the comment",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                commentar: {
                  type: "string",
                },
              },
              required: ["commentar"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Commentar Posted",
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
  "/comment/delete": {
    delete: {
      tags: ["API Commentar"],
      summary: "Delete a commentar by ID",
      security: [{ accessToken: [] }],
      parameters: [
        {
          name: "commentId",
          in: "query",
          required: true,
          description: "ID of the Commentar to delete",
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
          description: "Data Commentar not found",
        },
      },
    },
  },
};
