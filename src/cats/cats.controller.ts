import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Post()
  create(@Body() createCatsDto: CreateCatsDto) {
    console.log('data', createCatsDto);
    return this.catsService.create(createCatsDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCatsDto: UpdateCatsDto) {
    return this.catsService.update(id, updateCatsDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
