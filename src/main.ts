import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 8000;

	app.use(express.static(path.join(__dirname, '..', 'uploads')));
	app.use(cors());

	await app.listen(port);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);

	console.log(`listening on port ${port}`);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
