class MeetupController {
  async index(req, res) {
    return res.json({ ok: 'ok' });
  }
}

export default new MeetupController();
