import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

const ERRORS = {
  CREATE: 'Failed to create product',
  FETCH_ALL: 'Failed to fetch products',
  FETCH_ONE: 'Failed to fetch product',
  UPDATE: 'Failed to update product',
  DELETE: 'Failed to delete product',
  NOT_FOUND: 'Product not found',
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      return await this.productModel.create(dto);
    } catch (error: unknown) {
      console.error('Create Error:', error);

      if (error instanceof MongoServerError && error.code === 11000) {
        throw new HttpException(
          `Product with name '${dto.name}' already exists`,
          409,
        );
      }

      throw new HttpException(ERRORS.CREATE, 500);
    }
  }

  async findAll() {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      console.error('Find All Error:', error);

      throw new HttpException(ERRORS.FETCH_ALL, 500);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();

      if (!product) {
        throw new HttpException(ERRORS.NOT_FOUND, 404);
      }

      return product;
    } catch (error) {
      console.error('Find One Error:', error);
      throw new HttpException(ERRORS.FETCH_ONE, 500);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const updated = await this.productModel.findByIdAndUpdate(id, dto).exec();

      if (!updated) {
        throw new HttpException(ERRORS.NOT_FOUND, 404);
      }

      return updated;
    } catch (error) {
      console.error('Update Error:', error);
      throw new HttpException(ERRORS.UPDATE, 500);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.productModel.findByIdAndDelete(id).exec();

      if (!deleted) {
        throw new HttpException(ERRORS.NOT_FOUND, 404);
      }

      return deleted;
    } catch (error) {
      console.error('Delete Error:', error);
      throw new HttpException(ERRORS.DELETE, 500);
    }
  }
}
