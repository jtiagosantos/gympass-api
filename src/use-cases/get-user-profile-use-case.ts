import { UserRepository } from '@/repositories/user-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { User } from '@prisma/client';

interface GetUserProfileInput {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: GetUserProfileInput): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
