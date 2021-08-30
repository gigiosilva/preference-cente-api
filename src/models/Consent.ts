export enum ConsentType {
  EMAIL = 'email_notifications',
  SMS = 'sms_notifications',
}

export class Consent {
  id: ConsentType;
	enabled: boolean;
}