const mongoose = require('mongoose');

const GPSSchema = mongoose.Schema({
    latitud: {
        type: String,
        required: true
    },
    longitud: {
        type: String,
        required: true
    }
});

const HidrogenoSchema = mongoose.Schema({
    Min: {
        type: Number,
        required: true
    },
    Max: {
        type: Number,
        required: true
    },
    Prom: {
        type: Number,
        required: true
    }
});

const COSchema = mongoose.Schema({
    Min: {
        type: Number,
        required: true
    },
    Max: {
        type: Number,
        required: true
    },
    Prom: {
        type: Number,
        required: true
    }
});

const GasNaturalSchema = mongoose.Schema({
    Min: {
        type: Number,
        required: true
    },
    Max: {
        type: Number,
        required: true
    },
    Prom: {
        type: Number,
        required: true
    }
});

const TemperaturaSchema = mongoose.Schema({
    Min: {
        type: Number,
        required: true
    },
    Max: {
        type: Number,
        required: true
    },
    Prom: {
        type: Number,
        required: true
    }
})

const DataSchema = mongoose.Schema({
    Hidrogeno: {
        type: HidrogenoSchema,
        required: true
    },
    CO: {
        type: COSchema,
        required: true
    },
    GasNatural: {
        type: GasNaturalSchema,
        required: true
    },
    Temperatura: {
        type: TemperaturaSchema,
        required: true
    }
});

const SupervisorSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024
        },
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024
        }
});

const StaffSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024
        },
        registrationId: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024
        }
});

const History = mongoose.model('History', new mongoose.Schema({
    idSesion: {
        type: String,
        required: true,
        //unique: true
    },
    initialDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    supervisor: {
        type: SupervisorSchema,
        required: true
    },
    staff: {
        type: StaffSchema,
        required: true
    },
    MAC: {
        type: String,
        required: true
    },
    GPS: {
        type: GPSSchema,
        required: true
    },
    Data: {
        type: DataSchema,
        required: true
    }
}, {
        timestamps: true
    }));

exports.History = History;