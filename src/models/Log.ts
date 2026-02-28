import {Schema, model} from 'mongoose';

const logSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    level: {type: String, enum: ['info', 'warn', 'error'], default: 'info'},
    userId: {type: Number},
    action: {type: String},
    details: {type: Object},
    meta: {
        ip: {type: String},
        userAgent: {type: String}
    }
});

export const Log = model('Log', logSchema);
