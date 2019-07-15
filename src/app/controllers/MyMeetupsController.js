import Meetup from '../models/Meetup';
import File from '../models/File';

class UserMeetupControler {
  async index(req, res) {
    const { userId } = req;

    const meetups = await Meetup.findAll({
      where: { userId },
      order: [['date', 'DESC']],
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['url', 'path'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new UserMeetupControler();
