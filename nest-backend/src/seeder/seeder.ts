import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from './services/seeder.service';

async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const seederService = appContext.get(SeederService);
    await seederService.seed();
    await appContext.close();
}

bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
