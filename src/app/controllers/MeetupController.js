import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const where = {};
    const { page = 1 } = req.query;
    if (req.query.date) {
      const date = parseISO(req.query.date);
      where.date = {
        [Op.between]: [startOfDay(date), endOfDay(date)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date()
        .min(new Date())
        .required(),
      bannerId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, bannerId } = req.body;

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      bannerId,
      userId: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date().min(new Date()),
      bannerId: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { userId } = req;

    const meetup = await Meetup.findOne({
      where: { id, userId },
    });

    if (!meetup) {
      return res
        .status(401)
        .json({ error: 'You can only change the meetups you created' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Past meetups are not permitted' });
    }

    const meetupUpdated = await meetup.updaste(req.body);
    return res.json(meetupUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;

    const meetup = await Meetup.findOne({
      where: { id, userId },
    });

    if (!meetup) {
      return res
        .status(401)
        .json({ error: 'You can only cancel the meetups you created' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    await meetup.destroy();

    return res.status(200).send();
  }
}

export default new MeetupController();
