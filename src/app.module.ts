import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // 追記！
// import { Item } from './entities/item.entity'; // 追記
import { ItemModule } from './item/item.module';

@Module({
  // ここから追記！
  imports: [
    TypeOrmModule.forRoot(),
    ItemModule,
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'data/dev.sqlite',
    //   entities: [__dirname + '/entities/**/*{.ts,.js}'],
    //   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    //   logging: true,
    // }),
  ], // ここまで追記！
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
