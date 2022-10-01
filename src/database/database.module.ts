import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { mergeConnectionOptions } from './index';

@Module({})
export class DatabaseModule {
    public static async forRoot(): Promise<DynamicModule> {
        // read connection options from ormconfig file (or ENV variables)
        const options = await getConnectionOptions();
        return {
            module: DatabaseModule,
            imports: [TypeOrmModule.forRoot(mergeConnectionOptions(options))],
        };
    }
}
