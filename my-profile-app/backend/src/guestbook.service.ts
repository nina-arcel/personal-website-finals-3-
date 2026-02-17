import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async create(createGuestbookDto: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook_entries')
      .insert([createGuestbookDto])
      .select();

    if (error) throw error;
    return data[0];
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('guestbook_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
    return data;
  }

  async update(id: string, updateGuestbookDto: { name?: string; message?: string }) {
    await this.findOne(id);

    const { data, error } = await this.supabase
      .from('guestbook_entries')
      .update({ ...updateGuestbookDto, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    await this.findOne(id);

    const { error } = await this.supabase
      .from('guestbook_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Entry deleted successfully' };
  }
}