import { url } from "inspector";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Todo API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://ocb24.atifaiman.dev",
      }
    ],
  },
  apis: ["./routes/*.js"],
};

const docsSpecs = swaggerJsdoc(options);

export default docsSpecs;