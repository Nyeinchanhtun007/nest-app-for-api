import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('findOne')
  findOne(): string {
    return 'This action returns a cat';
  }

  @Post()
  create(@Req() req: Request): string {
    const data = req.body;
    return `This action create a cat with data ${JSON.stringify(data)}`;
  }

  @Put('/:id')
  update(@Param('id') id: string, @Req() req: Request): string {
    const data = req.body;
    return `This action updates a cat with id ${id} and data ${JSON.stringify(data)}`;
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return `This action removes a cat with id ${id}`;
  }
}
