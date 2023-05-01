import { CategoryService } from './categories.service';
import { errorRes, successRes } from '../utls/response.formatter';
import _ = require('lodash');
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

import { CategoryDto } from './dto/create-update-categories.dto';
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';

@Controller('api/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() CreateUpdateCategories: CategoryDto) {
    try {
      const createdCategory = await this.categoryService.create(
        CreateUpdateCategories,
      );
      return successRes('Expense created successfully', createdCategory);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      if (_.isEmpty(categories)) {
        return errorRes('Error fetching categories');
      }
      return successRes('Categories fetching successfully', categories);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
