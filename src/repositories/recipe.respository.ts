import { Recipe } from '@/app/types';
import { db } from '../db/connector';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class RecipeRepository {
    async findAll(): Promise<Recipe[]> {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM recipes');
        return rows as Recipe[];
    }

    async findById(id: number): Promise<Recipe | null> {
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM recipes WHERE id = ?', [id]
        );
        const recipes = rows as Recipe[];
        return recipes[0] || null;
    }

    async create(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
        const now = new Date();
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO recipes (title, description, ingredients, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
            [data.title, data.description, data.ingredients, now, now]
        );
        return {
            id: String(result.insertId),
            ...data,
        };
    }

    async update(id: number, data: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Recipe | null> {
        const now = new Date();
        const fields = [];
        const values = [];
        for (const key in data) {
            fields.push(`${key} = ?`);
            values.push((data as any)[key]);
        }
        values.push(now, id);
        await db.query(
            `UPDATE recipes SET ${fields.join(', ')}, updatedAt = ? WHERE id = ?`,
            values
        );
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    }
}