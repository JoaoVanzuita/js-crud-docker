const client = require('./_database')

const userDao = {
  get: async () => {
    const sql = 'select * from users;'

    return await client.query(sql)
  },
  getById: async (values) => {
    const sql = 'select * from users where id=$1;'

    return await client.query(sql, values)
  },
  create: async (values) => {
    const sql = 'insert into users(name, email) values ($1, $2) RETURNING *;'

    return await client.query(sql, values)
  },
  update: async (values) => {
    const sql = 'update users set name=$1, email=$2 where id=$3 RETURNING *'

    return await client.query(sql, values)
  },
  delete: async (values) => {
    const sql = 'delete from users where id=$1 RETURNING *'

    return await client.query(sql, values)
  }
}

module.exports = userDao
