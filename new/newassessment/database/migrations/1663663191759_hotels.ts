import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('hotel_name')
      table.integer('hotel_doorno')
      table.string('hotel_street')
      table.string('hotel_landmark')
      table.string('hotel_pincode')
      table.integer('customer_id')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
