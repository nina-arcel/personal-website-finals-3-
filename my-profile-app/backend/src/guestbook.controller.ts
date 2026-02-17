import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

export class CreateGuestbookDto {
  name: string;
  message: string;
}

export class UpdateGuestbookDto {
  name?: string;
  message?: string;
}

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  async create(@Body() createGuestbookDto: CreateGuestbookDto) {
    return this.guestbookService.create(createGuestbookDto);
  }

  @Get()
  async findAll() {
    return this.guestbookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guestbookService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGuestbookDto: UpdateGuestbookDto) {
    return this.guestbookService.update(id, updateGuestbookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.guestbookService.remove(id);
  }
}