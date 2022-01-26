import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '@modules/posts/services/CreatePostService';
import ListPostService from '@modules/posts/services/ListPostService';
import ShowPostService from '@modules/posts/services/ShowPostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';

export default class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPosts = container.resolve(ListPostService);

    const posts = await listPosts.execute();

    return response.json(posts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowPostService);

    const post = await showPost.execute({ id });

    return response.json(post);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body;

    const userId = request.user.id;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      title,
      content,
      userId,
    });

    return response.status(201).json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body;
    const { id } = request.params;

    const updatePost = container.resolve(UpdatePostService);

    const customer = await updatePost.execute({
      id,
      title,
      content,
    });

    return response.json(customer);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteCustomer = container.resolve(DeleteCustomerService);

  //   await deleteCustomer.execute({ id });

  //   return response.json([]);
  // }
}
