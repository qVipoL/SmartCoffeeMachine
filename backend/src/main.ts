import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from './server';

async function main() {
  const server = new Server(await NestFactory.create(AppModule));

  server.init();
  server.start();
}

main();
