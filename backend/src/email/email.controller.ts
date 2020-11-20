import { Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './schema/email.schema';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('/:id')
  verify(@Param('id') id: string): Promise<Email> {
    return this.emailService.verifyEmail(id);
  }
}
