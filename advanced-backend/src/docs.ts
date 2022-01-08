import {DocumentBuilder} from "@nestjs/swagger";

export const apiDocument = new DocumentBuilder()
    .setTitle('Advanced backend')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('karasick')
    .build()