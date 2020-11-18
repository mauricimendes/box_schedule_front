import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderCategory1605375748900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('b');
        await queryRunner.createTable(
            new Table({
                name: 'order_category',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isUnique: true,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('order_category')
    }

}