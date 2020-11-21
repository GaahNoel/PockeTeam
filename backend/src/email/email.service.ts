import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import * as nodemailer from 'nodemailer';
import { Email } from './schema/email.schema';
import { VerifyEmailDto } from './dtos/verify-email.dto';
@Injectable()
export class EmailService {
  constructor(
    @InjectModel(User.name)
    private UserModel: SoftDeleteModel<User>,
    @InjectModel(Email.name)
    private EmailModel: SoftDeleteModel<Email>,
  ) {}

  async createEmailToken(email: string): Promise<VerifyEmailDto> {
    const { id } = await this.UserModel.findOne({ email });
    const emailVerification = await new this.EmailModel({
      user: id,
    });
    return emailVerification.save();
  }

  async sendEmailVerification(token: string): Promise<boolean> {
    const emailVerification = await this.EmailModel.findById(token).populate(
      'user',
    );
    if (!emailVerification) {
      throw new ForbiddenException('REGISTER.USER_NOT_REGISTERED');
    }

    const { user } = emailVerification;

    const html = `
          <p>Hello ${user.username},</p>
          <p>Thanks for your registration! Enjoy the PockeTeam :) </p>
          <br>
          <a href="${process.env.WEB_APP_URI}/email?token=${token}">
            Click here to activate your account
          </a>
        `;

    const mailOptions = {
      from: 'PockeTeam',
      to: `${user.email}`, // list of receivers (separated by ,)
      subject: 'Email Verification - PockeTeam',
      html,
    };

    return nodemailer
      .createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      })
      .sendMail(mailOptions, async err => {
        if (err) {
          return false;
        }
        return true;
      });
  }

  async verifyEmail(token: string): Promise<Email> {
    const emailVerification = await this.EmailModel.findById(token).populate(
      'user',
    );
    const { user } = emailVerification;
    if (user.verified) throw new BadRequestException('Usuário já verificado');
    return this.UserModel.findByIdAndUpdate(user.id, { verified: true });
  }
}
