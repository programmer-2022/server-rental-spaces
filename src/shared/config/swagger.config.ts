/* eslint-disable prettier/prettier */
import { DocumentBuilder } from "@nestjs/swagger";

interface ConfigParams {
  version: string;
}

export const swaggerConfig = (params: ConfigParams) => {
  return new DocumentBuilder()
    .setTitle("Rental Spaces Server")
    .setDescription("Users Microservice Description")
    .setVersion(params.version)
    .build();
};
