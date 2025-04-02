import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: false,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export default sql