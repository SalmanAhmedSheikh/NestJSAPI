import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'
import bodyParser = require('body-parser');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


//app.use(bodyParser.json());
  app.use(cors());

  var port = process.env.port || 5000;

  await app.listen(5000);
}
bootstrap();
