import { type User, UserModel } from '~/models/user.model'
import type { BaseRepositoryInterface } from './base/base.abstract.repository'
import { BaseRepositoryAbstract } from './base/base.interface.repository'

export type UserRepositoryInterface = BaseRepositoryInterface<User> & {}

class UserRepository extends BaseRepositoryAbstract<User> implements UserRepositoryInterface {
	constructor() {
		super(UserModel)
	}
}

export default new UserRepository()
