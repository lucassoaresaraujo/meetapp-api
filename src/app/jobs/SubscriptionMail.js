import Mail from '../../lib/Mail';

class CancelletionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { user, meetup } = data;
    const { name: nameOrganizer, email: emailOrganizer } = meetup.user;
    await Mail.sendMail({
      to: `${nameOrganizer} <${emailOrganizer}>`,
      subject: 'Nova Inscrição',
      template: `subscription`,
      context: {
        nameOrganizer,
        nameUser: user.name,
        emailUser: user.email,
        titleMeetup: meetup.title,
      },
    });
  }
}

export default new CancelletionMail();
