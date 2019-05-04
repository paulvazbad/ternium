const { History } = require('../models/history');
const { Alarms } = require('../models/alarms');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/:Number', auth, async (req, res) => {
    const history = await History.find().limit(req.params.Number / 2);
    const alarms = await Alarms.find().limit(req.params.Number / 2);
    res.json([history, alarms]);
});

router.get('/search/:Data', auth, async (req, res) => {
    var data = req.params.Data;
    const historySesion = await History.find({ idSesion: { $regex: `${data}`, $options: 'i' } });
    const historyTrabajdor = await History.find({ idTrabajador: { $regex: `${data}`, $options: 'i' } });
    const historySupervisor = await History.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const historyBeginTime = await History.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const historyEndTime = await History.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const historyArea = await History.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const historyLugar = await History.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const historyMAC = await History.find({ MAC: { $regex: `${data}`, $options: 'i' } });
    const ObjHistory = Object.assign(historySesion, historyTrabajdor, historySupervisor, historyBeginTime, historyEndTime, historyArea, historyLugar, historyMAC);

    const alarmID = await Alarms.find({ idAlarma: { $regex: `${data}`, $options: 'i' } });
    const alarmSesion = await Alarms.find({ idSesion: { $regex: `${data}`, $options: 'i' } });
    const alarmTrabajador = await Alarms.find({ idTrabajador: { $regex: `${data}`, $options: 'i' } });
    const alarmSupervisor = await Alarms.find({ idSupervisor: { $regex: `${data}`, $options: 'i' } });
    const alarmMAC = await Alarms.find({ MAC: { $regex: `${data}`, $options: 'i' } });
    const ObjAlarms = Object.assign(alarmID, alarmSesion, alarmTrabajador, alarmSupervisor, alarmMAC);

    res.json([ObjHistory, ObjAlarms]);
});

module.exports = router;