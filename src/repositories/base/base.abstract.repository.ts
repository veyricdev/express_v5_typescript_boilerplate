import type { IfAny } from 'mongoose'
import type { Document } from 'mongoose'
import type { MongooseBaseQueryOptions } from 'mongoose'
import type { FilterQuery, Query, QueryOptions, UpdateQuery } from 'mongoose'

export type FindAllResponse<T> = {
	limit?: number
	total: number
	items: T[]
	next_key?: object
}

export interface BaseRepositoryInterface<T> {
	create(dto: T | any): Promise<T>

	findOneById(id: string, projection?: string, options?: QueryOptions<T>): Query<T | null, T, {}, T, 'findOne', {}>

	findOneByCondition(
		condition?: object,
		projection?: string,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOne', {}>

	findAll(condition: FilterQuery<T>, options?: QueryOptions<T>): Promise<FindAllResponse<T>>

	findOneAndUpdate(
		condition: object,
		dto: Partial<UpdateQuery<T>>,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOneAndUpdate', {}>

	update(
		id: string,
		dto: Partial<UpdateQuery<T>>,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOneAndUpdate', {}>

	softDelete(id: string): Promise<boolean>

	destroy(id: string): Query<boolean | null, boolean, {}, T, 'findOneAndDelete', {}>

	insertMany(items: T[]): Promise<T[]>

	count(
		condition: object,
		options?: MongooseBaseQueryOptions<T> | null
	): Query<number, IfAny<T, any, Document<unknown, {}, T>>>
}
