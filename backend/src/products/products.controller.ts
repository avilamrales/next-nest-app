import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all products',
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: 'Get a product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a product',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Delete a product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
