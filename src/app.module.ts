import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { RequestsModule } from './requests/requests.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ UsersModule, AuthModule, BooksModule, RequestsModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
