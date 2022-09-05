import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('age')
      table.integer('salary')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
