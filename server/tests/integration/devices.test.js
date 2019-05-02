const request = require('supertest');
const {Device} = require('../../models/device');
const {User} = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/devices', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => { 
    await server.close(); 
    await Device.remove({});
  });

  describe('GET /', () => {
    it('should return all devices', async () => {
      const devices = [
        { mac: 'device1' },
        { mac: 'device2' },
      ];
      
      await Device.collection.insertMany(devices);

      const res = await request(server).get('/api/devices');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.mac === 'device1')).toBeTruthy();
      expect(res.body.some(g => g.mac === 'device2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a device if valid id is passed', async () => {
      const device = new Device({ mac: 'device1' });
      await device.save();

      const res = await request(server).get('/api/devices/' + device._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('mac', device.mac);     
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/devices/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no device with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/devices/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {

    // Define the happy path, and then in each test, we change 
    // one parameter that clearly aligns with the mac of the 
    // test. 
    let token; 
    let mac; 

    const exec = async () => {
      return await request(server)
        .post('/api/devices')
        .set('x-auth-token', token)
        .send({ mac });
    }

    beforeEach(() => {
      token = new User().generateAuthToken();      
      mac = 'device1'; 
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if device is less than 5 characters', async () => {
      mac = '1234'; 
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if device is more than 50 characters', async () => {
      mac = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the device if it is valid', async () => {
      await exec();

      const device = await Device.find({ mac: 'device1' });

      expect(device).not.toBeNull();
    });

    it('should return the device if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('mac', 'device1');
    });
  });

  describe('PUT /:id', () => {
    let token; 
    let newMac; 
    let device; 
    let id; 

    const exec = async () => {
      return await request(server)
        .put('/api/devices/' + id)
        .set('x-auth-token', token)
        .send({ mac: newMac });
    }

    beforeEach(async () => {
      // Before each test we need to create a device and 
      // put it in the database.      
      device = new Device({ mac: 'device1' });
      await device.save();
      
      token = new User().generateAuthToken();     
      id = device._id; 
      newMac = 'updatedmac'; 
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if device is less than 5 characters', async () => {
      newMac = '1234'; 
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if device is more than 50 characters', async () => {
      newMac = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if device with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the device if input is valid', async () => {
      await exec();

      const updatedDevice = await Device.findById(device._id);

      expect(updatedDevice.mac).toBe(newMac);
    });

    it('should return the updated device if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('mac', newMac);
    });
  });  

  describe('DELETE /:id', () => {
    let token; 
    let device; 
    let id; 

    const exec = async () => {
      return await request(server)
        .delete('/api/devices/' + id)
        .set('x-auth-token', token)
        .send();
    }

    beforeEach(async () => {
      // Before each test we need to create a device and 
      // put it in the database.      
      device = new Device({ mac: 'device1' });
      await device.save();
      
      id = device._id; 
      token = new User({ isAdmin: true }).generateAuthToken();     
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken(); 

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1; 
      
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no device with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the device if input is valid', async () => {
      await exec();

      const deviceInDb = await Device.findById(id);

      expect(deviceInDb).toBeNull();
    });

    it('should return the removed device', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', device._id.toHexString());
      expect(res.body).toHaveProperty('mac', device.mac);
    });
  });  
});