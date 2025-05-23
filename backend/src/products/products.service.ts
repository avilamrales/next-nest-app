import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productModel.create(createProductDto);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException('Failed to create product', 500);
    }
  }

  async findAll() {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new HttpException('Failed to fetch products', 500);
    }
  }

  async findOne(id: string) {
    try {
      const productFound = await this.productModel.findById(id).exec();

      if (!productFound) throw new HttpException('Product not found', 404);

      return productFound;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new HttpException('Failed to fetch product', 500);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto)
        .exec();

      if (!updatedProduct) throw new HttpException('Product not found', 404);

      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new HttpException('Failed to update product', 500);
    }
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedProduct) throw new HttpException('Product not found', 404);

      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new HttpException('Failed to delete product', 500);
    }
  }
}
