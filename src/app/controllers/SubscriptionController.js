import * as Yup from 'yup';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      meetupId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { meetupId } = req.body;

    const meetup = await Meetup.findOne({
      where: { id: meetupId },
      include: [
        {
          as: 'user',
          model: User,
        },
      ],
    });
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Meetup,
          as: 'subscribedMeetups',
          attributes: ['id', 'title', 'description', 'past', 'date'],
          where: { date: { [Op.gte]: new Date() } },
          required: false,
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exist' });
    }

    if (meetup.userId === req.userId) {
      return res.status(401).json({
        error: 'You can only subscribe to meetups organized by other users',
      });
    }

    if (meetup.past) {
      return res.status(401).json({
        error: 'You can not sign up for a meetup that has already happened.',
      });
    }

    const userAlreadySubscribed = user.subscribedMeetups.find(subscription => {
      return subscription.id === meetupId;
    });

    if (userAlreadySubscribed) {
      return res.status(400).json({
        error: 'You already have an entry for this meetup.',
      });
    }

    const schedulingConflict = user.subscribedMeetups.find(subscription => {
      return subscription.date === meetup.date;
    });

    if (schedulingConflict) {
      return res.status(400).json({
        error: 'User is already subscribed to a meetup at this time.',
      });
    }

    await user.addSubscribedMeetup(meetup);

    Queue.add(SubscriptionMail.key, { user, meetup });

    return res.status(201).send();
  }
}

export default new SubscriptionController();
