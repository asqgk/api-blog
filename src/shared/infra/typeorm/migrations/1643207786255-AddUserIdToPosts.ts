import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIdToPosts1643207786255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'UserPosts',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'UserPosts');
    await queryRunner.dropColumn('posts', 'userId');
  }
}
