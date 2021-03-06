import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '@modules/posts/services/CreatePostService';
import ListPostService from '@modules/posts/services/ListPostService';
import ShowPostService from '@modules/posts/services/ShowPostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';
import SearchPostsService from '@modules/posts/services/SearchPostsService';

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

    const user_id = request.user.id;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      title,
      content,
      user_id,
    });

    return response.status(201).json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, content } = request.body;

    const user_id = request.user.id;

    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      id,
      title,
      content,
      user_id,
    });

    return response.json(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user_id = request.user.id;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({ id, user_id });

    return response.status(204).json([]);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const param = request.query.q as string;

    const filteredPosts = container.resolve(SearchPostsService);

    const posts = await filteredPosts.execute({ param });

    return response.json(posts);
  }
}
