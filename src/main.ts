import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { CORS, EnvMap, swaggerConfig } from "./config";

async function bootstrap() {
  // Create Instance
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get<ConfigService>(ConfigService);
  const logger = app.get(Logger);

  const { GLOBAL_PREFIX, VERSION, PORT, URL_HOST, ENVIRONMENT } = EnvMap;

  const environment = configService.get<string>(ENVIRONMENT);
  const globalPrefix = configService.get<string>(GLOBAL_PREFIX, "api");
  const version = configService.get<string>(VERSION, "v1.0");
  const port = configService.get<number>(PORT, 8000);
  const urlHost = configService.get<string>(URL_HOST, "localhost");

  // Setup Middlewares
  app.setGlobalPrefix(`${globalPrefix}/${version}`);
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const swaggerConfigCustom = swaggerConfig({ version });
  const document = SwaggerModule.createDocument(app, swaggerConfigCustom);
  SwaggerModule.setup("docs", app, document);

  // Server UP
  await app.listen(port, "0.0.0.0");

  // https://textkool.com/en/ascii-art-generator?hl=default&vl=default&font=ANSI%20Shadow&text=RENTAL-SPACES
  logger.log(`
  ██████╗ ███████╗███╗   ██╗████████╗ █████╗ ██╗      ███████╗██████╗  █████╗  ██████╗███████╗███████╗
  ██╔══██╗██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██║      ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
  ██████╔╝█████╗  ██╔██╗ ██║   ██║   ███████║██║█████╗███████╗██████╔╝███████║██║     █████╗  ███████╗
  ██╔══██╗██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║╚════╝╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝  ╚════██║
  ██║  ██║███████╗██║ ╚████║   ██║   ██║  ██║███████╗ ███████║██║     ██║  ██║╚██████╗███████╗███████║
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝
  ****************************************************************************************************
    App is ready and listening on port ${port} 🚀
    Server: ${urlHost}:${port}/${globalPrefix}/${version}/health
    Swagger: ${urlHost}:${port}/docs
    Current Environment: ${environment}
  `);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
