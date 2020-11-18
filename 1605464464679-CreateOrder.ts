import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrder1605375048746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('a');
        return queryRunner.createTable(
            new Table({
                name: 'order_service',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'client_name',
                        type: 'varchar'
                    },
                    {
                        name: 'category_id',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'expected_hours',
                        type: 'int',
                    },
                    {
                        name: 'hours_performed',
                        type: 'int',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'OrderCategory',
                        referencedTableName: 'order_category',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('order_service')
    }

}