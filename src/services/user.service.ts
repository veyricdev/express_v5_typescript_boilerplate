import userRepository, { type UserRepositoryInterface } from '~/repositories/user.repository'

class UserService {
	private userRepository: UserRepositoryInterface

	constructor() {
		this.userRepository = userRepository
	}
}

export default new UserService()
