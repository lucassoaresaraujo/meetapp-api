import * as Yup from 'yup';

import Meetup from '../models/Meetup';

class MeetupController {
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
