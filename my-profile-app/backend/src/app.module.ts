import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
  ],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class AppModule {}