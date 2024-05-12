module.exports = {
  "/user/signup": {
    post: {
      tags: ["API User"],
      summary: "Create new user",
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                fullname: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                headline: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                confirmPassword: {
                  type: "string",
                },
              },
              required: ["fullname", "username", "password", "confirmPassword"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User Created",
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
  "/user/me": {
    get: {
      tags: ["API User"],
      summary: "Get user by token",
      security: [{ accessToken: [] }],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
      },
    },
  },
  "/user/signin": {
    post: {
      tags: ["API User"],
      summary: "User Login",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  description: "Username of the user",
                },
                password: {
                  type: "string",
                  description: "User password",
                },
              },
              required: ["username", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
          content: {
            "application/json": {
              example: {
                accessToken: "your_access_token_here",
              },
            },
          },
        },
        400: {
          description: "Bad request",
          content: {
            "application/json": {
              example: {
                msg: "Password salah!",
              },
            },
          },
        },
        404: {
          description: "Username not found",
          content: {
            "application/json": {
              example: {
                msg: "Username tidak ditemukan",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              example: {
                msg: "Internal server error message",
              },
            },
          },
        },
      },
    },
  },
  "/users": {
    get: {
      tags: ["API User"],
      summary: "Get all users",
      security: [],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
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
  "/token": {
    get: {
      tags: ["API User"],
      summary: "Refresh access token",
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              example: {
                error: "Bad Request",
                message: "Login First",
              },
            },
          },
        },
      },
    },
  },
  "/user/logout": {
    delete: {
      tags: ["API User"],
      summary: "User logout",
      security: [{ accessToken: [] }],
      produces: ["application/json"],
      responses: {
        204: {
          description: "No Content",
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
  "/user": {
    get: {
      tags: ["API User"],
      summary: "Get user by ID",
      security: [],
      parameters: [
        {
          name: "userId",
          in: "query",
          required: true,
          description: "ID of the user to retrieve",
          schema: {
            type: "string",
          },
        },
      ],
      produces: ["application/json"],
      responses: {
        200: {
          description: "OK",
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              example: {
                error: "User not found",
                message: "The requested user ID was not found",
              },
            },
          },
        },
      },
    },
  },
  "/user/update": {
    put: {
      tags: ["API User"],
      summary: "Update user by ID",
      security: [{ accessToken: [] }],
      parameters: [],
      requestBody: {
        // required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                fullname: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
                headline: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
              required: [],
            },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              example: {
                error: "Bad Request",
                message: "Login First",
              },
            },
          },
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
        404: {
          description: "User not found",
          content: {
            "application/json": {
              example: {
                msg: "User tidak ditemukan.",
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              example: {
                msg: "Terjadi kesalahan saat mengunggah gambar",
              },
            },
          },
        },
      },
    },
  },
};
