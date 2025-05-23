import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';
import { describe, expect } from 'vitest';
import { pg as schema } from './schema.mjs';

if (!process.env['PG_CONNECTION_STRING']) {
	throw new Error('PG_CONNECTION_STRING is not defined');
}

describe('postgres-js', async (it) => {
	it('drizzle(string)', async () => {
		const db = drizzle(process.env['PG_CONNECTION_STRING']);

		await db.$client.unsafe('SELECT 1;');
	});

	it('drizzle(string, config)', async () => {
		const db = drizzle(process.env['PG_CONNECTION_STRING'], {
			schema,
		});

		await db.$client.unsafe('SELECT 1;');

		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({connection: string, ...config})', async () => {
		const db = drizzle({
			connection: process.env['PG_CONNECTION_STRING'],
			schema,
		});

		await db.$client.unsafe('SELECT 1;');

		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({connection: params, ...config})', async () => {
		const db = drizzle({
			connection: {
				url: process.env['PG_CONNECTION_STRING'],
			},
			schema,
		});

		await db.$client.unsafe('SELECT 1;');

		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle(client)', async () => {
		const client = pg(process.env['PG_CONNECTION_STRING']);
		const db = drizzle(client);

		await db.$client.unsafe('SELECT 1;');
	});

	it('drizzle(client, config)', async () => {
		const client = pg(process.env['PG_CONNECTION_STRING']);
		const db = drizzle(client, {
			schema,
		});

		await db.$client.unsafe('SELECT 1;');

		expect(db.query.User).not.toStrictEqual(undefined);
	});

	it('drizzle({client, ...config})', async () => {
		const client = pg(process.env['PG_CONNECTION_STRING']);
		const db = drizzle({
			client,
			schema,
		});

		await db.$client.unsafe('SELECT 1;');

		expect(db.query.User).not.toStrictEqual(undefined);
	});
});
