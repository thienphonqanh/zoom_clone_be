import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
const fileExtension = __filename.endsWith('.ts') ? 'ts' : 'js'
export const dataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.HOST}`,
  port: parseInt(`${process.env.PORT}`),
  username: `${process.env.DB_USER_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/models/entity/**/*.${fileExtension}`],
  subscribers: [],
  migrations: [`${__dirname}/models/migrations/**/*.${fileExtension}`]
})
