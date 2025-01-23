import {
	type FilterQuery,
	type IfAny,
	type Model,
	type MongooseBaseQueryOptions,
	type Query,
	type QueryOptions,
	type UpdateQuery,
	isObjectIdOrHexString,
} from 'mongoose'

import { StatusCodes } from 'http-status-codes'
import type { Document } from 'mongoose'
import ApiError from '~/core/ApiError'
import type { BaseRepositoryInterface, FindAllResponse } from './base.abstract.repository'

export abstract class BaseRepositoryAbstract<T> implements BaseRepositoryInterface<T> {
	protected constructor(private readonly model: Model<T>) {
		this.model = model
	}

	create(dto: T | any): Promise<T> {
		return this.model.create(dto)
	}

	findOneById(id: string, projection?: string, options?: QueryOptions<T>): Query<T | null, T, {}, T, 'findOne', {}> {
		if (!isObjectIdOrHexString(id)) throw new ApiError('Invalid id', StatusCodes.BAD_REQUEST)

		return this.model.findById(id, projection, options)
	}

	findOneByCondition(
		condition?: object,
		projection?: string,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOne', {}> {
		return this.model.findOne(condition, projection, options)
	}

	async findAll(condition: FilterQuery<T>, options: QueryOptions<T> = {}): Promise<FindAllResponse<T>> {
		const { projection = '-__v', ...otherOptions } = options

		const [total, items] = await Promise.all([
			this.model.countDocuments({ ...condition }),
			this.model.find({ ...condition }, projection, { sort: { _id: 1 }, ...otherOptions }),
		])

		return {
			total,
			items,
			limit: otherOptions.limit,
		}
	}

	findOneAndUpdate(
		condition: object,
		dto: Partial<UpdateQuery<T>>,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOneAndUpdate', {}> {
		return this.model.findOneAndUpdate(condition, dto, { ...options })
	}

	update(
		id: string,
		dto: Partial<UpdateQuery<T>>,
		options?: QueryOptions<T>
	): Query<T | null, T, {}, T, 'findOneAndUpdate', {}> {
		return this.findOneAndUpdate({ _id: id }, dto, { new: true, ...options })
	}

	async softDelete(id: string): Promise<boolean> {
		if (!isObjectIdOrHexString(id)) throw new ApiError('Invalid id', StatusCodes.BAD_REQUEST)

		return !!(await this.model.updateOne({ _id: id }, { deletedAt: Date.now() })).modifiedCount
	}

	destroy(id: string): Query<boolean | null, boolean, {}, T, 'findOneAndDelete', {}> {
		if (!isObjectIdOrHexString(id)) throw new ApiError('Invalid id', StatusCodes.BAD_REQUEST)

		return this.model.findByIdAndDelete(id)
	}

	insertMany(items: T[]): Promise<T[]> {
		return this.model.insertMany(items)
	}

	count(
		condition: object,
		options?: MongooseBaseQueryOptions<T> | null
	): Query<number, IfAny<T, any, Document<unknown, {}, T>>> {
		return this.model.countDocuments(condition, { ...options })
	}
}
