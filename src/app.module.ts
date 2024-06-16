import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '@image/image.module';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { UserModule } from '@user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from '@config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '@product/product.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			cache: true,
		}),
		MongooseModule.forRoot(process.env.DB_URL),
		RouterModule.register(routes),
		UserModule,
		ImageModule,
		AuthModule,
		ProductModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
