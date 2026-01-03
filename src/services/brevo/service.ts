import {
  ContactsApi,
  ContactsApiApiKeys,
  CreateContact,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactList } from './constant';
import { welcomeEmail } from 'src/templates/welcome';

@Injectable()
export class BrevoService {
  private readonly contactsApi: ContactsApi;
  private readonly transactionEmailApi: TransactionalEmailsApi;
  constructor(private readonly configService: ConfigService) {
    const contactsApi = new ContactsApi();
    const transactionApi = new TransactionalEmailsApi();
    contactsApi.setApiKey(
      ContactsApiApiKeys.apiKey,
      this.configService.getOrThrow('BREVO_API_KEY'),
    );

    transactionApi.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      this.configService.getOrThrow('BREVO_API_KEY'),
    );
    this.contactsApi = contactsApi;
    this.transactionEmailApi = transactionApi;
  }

  createContact(payload: CreateContact) {
    return this.contactsApi.createContact({
      ...payload,
      listIds: [ContactList.CUSTOMER_QUERY],
    });
  }

  sendEmail({ email, name }: { name: string; email: string }) {
    return this.transactionEmailApi.sendTransacEmail({
      htmlContent: welcomeEmail(),
      sender: {
        email: 'contact@codernex.dev',
        name: 'Borhan Uddin (Codernex)',
      },
      to: [
        {
          email,
          name,
        },
      ],
      subject: 'RE: Inbound_Signal // Status: 200 OK (Borhan Uddin)',
    });
  }
}
