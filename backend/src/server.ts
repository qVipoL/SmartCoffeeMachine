import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

export class Server {
  private readonly config: ConfigService;

  constructor(private readonly app: INestApplication) {
    this.config = app.get(ConfigService);
  }

  init() {
    this.app.useGlobalPipes(new ValidationPipe());
    this.app.enableCors({
      origin: this.config.get<string>('ORIGIN'),
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Smart Coffe Machine API')
      .setDescription('Smart Coffe Machine API Documentation')
      .build();

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('/docs', this.app, document);
  }

  async start() {
    await this.app.listen(this.config.get<number>('PORT'), () => {
      console.log(
        `Server is running at ${this.config.get<string>(
          'HOST'
        )}:${this.config.get<number>('PORT')} 🚀`
      );
    });

    const prismaService = this.app.get(PrismaService);
    await prismaService.enableShutdownHooks(this.app);
  }
}
