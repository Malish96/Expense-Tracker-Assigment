import { Injectable } from '@nestjs/common';
import { CreateUpdateCategories } from '../models/categories.model';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/schemas/categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) { }
  
  async create(
    CreateUpdateCategory: Omit<CreateUpdateCategories, 'id' | 'photo'>,
  ): Promise<Category> {
    return new this.categoryModel(CreateUpdateCategory).save();
  }

  async findAll() {
    return this.categoryModel.find();
  }
}
