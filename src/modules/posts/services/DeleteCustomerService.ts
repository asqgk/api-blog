import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.postsRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.postsRepository.remove(customer);
  }
}

export default DeleteCustomerService;
