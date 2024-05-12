module.exports = {
  userSchema: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      fullname: {
        type: "string",
      },
      username: {
        type: "string",
      },
      role: {
        type: "string",
      },
      password: {
        type: "string",
      },
      headline: {
        type: "string",
      },
      refreshToken: {
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
