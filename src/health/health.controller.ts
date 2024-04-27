import { Controller, Get, HttpCode, Inject, Logger } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller({ path: "health" })
export class HealthController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @ApiOperation({
    summary: "Check microservice status.",
    description: "Check microservice status.",
  })
  @ApiOkResponse({ description: "Ok." })
  @HttpCode(200)
  run() {
    this.logger.log("Health endpoint called!");
    return { status: "ok" };
  }
}
