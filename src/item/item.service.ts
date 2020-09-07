import { Injectable } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDTO } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(item: CreateItemDTO): Promise<InsertResult> {
    return await this.itemRepository.insert(item);
  }

  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id: id });
  }

  async update(id: number, item): Promise<UpdateResult> {
    return await this.itemRepository.update(id, item);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }

  async deleteByPassword(
    id: number,
    deletePassword: string,
  ): Promise<DeleteResult> {
    const targetItem = await this.find(id);
    if (!targetItem) {
      return Promise.reject(new Error('Missing Item.'));
    }
    if (targetItem.deletePassword !== deletePassword) {
      return Promise.reject(new Error('Incorrect password'));
    }
    return await this.itemRepository.delete(id);
  }
}
