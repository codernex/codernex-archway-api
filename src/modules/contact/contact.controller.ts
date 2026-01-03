import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Public } from 'src/core/decorator/auth.decorator';
import { BrevoService } from 'src/services/brevo';

class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly brevoService: BrevoService) {}

  @Public()
  @Post()
  async createContact(@Body() dto: CreateContactDto) {
    const [firstName, lastName] = dto.name.split(' ');
    await this.brevoService.createContact({
      email: dto.email,
      attributes: {
        FIRST_NAME: firstName,
        LAST_NAME: lastName,
      },
      updateEnabled: true,
    });

    await this.brevoService.sendEmail(dto);

    return 'email send';
  }
}
