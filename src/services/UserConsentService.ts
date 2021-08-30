import { Consent } from '@models/Consent';
import { EventData } from '@models/EventData';
import { UserConsent } from '@models/UserConsent';
import { getRepository, Repository } from 'typeorm';

class UserConsentService {
  async updateUserConsent(idUser: string, consent: Consent) {
    const userConsentRepository: Repository<UserConsent> = getRepository(UserConsent);

    const userConsent: UserConsent = await userConsentRepository.findOne({
      id: consent.id,
      idUser,
    });

    let userConsentUpdated: UserConsent;
    let status: string;

    if (userConsent) {
      userConsentUpdated = userConsent;
      userConsentUpdated.enabled = consent.enabled;
      status = 'updated';

      await userConsentRepository.update({
        id: consent.id,
        idUser,
      }, userConsentUpdated);
    } else {
      status = 'created';

      userConsentUpdated = await userConsentRepository.save({
        id: consent.id,
        idUser,
        enabled: consent.enabled,
      });
    }

    return {
      status,
      userConsent: userConsentUpdated,
    };
  }

  setConsentByEvent(data: EventData) {
    const { user, consents } = data;

    consents.forEach((consent: Consent) => {
      this.updateUserConsent(user.id, consent);
    });
  }
}

export default new UserConsentService();