import { Schema, model, type Document } from 'mongoose'

export interface IRequestLog extends Document {
    method: string
    url: string
    statusCode: number
    duration: number
    userId?: string
    userRole?: string
    ip?: string
    userAgent?: string
    createdAt: Date
}

const requestLogSchema = new Schema<IRequestLog>(
    {
        method: { type: String, required: true },
        url: { type: String, required: true },
        statusCode: { type: Number, required: true },
        duration: { type: Number, required: true },
        userId: { type: String },
        userRole: { type: String },
        ip: { type: String },
        userAgent: { type: String }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
)

requestLogSchema.index({ createdAt: -1 })
requestLogSchema.index({ userId: 1 })
requestLogSchema.index({ statusCode: 1 })

export const RequestLog = model<IRequestLog>('RequestLog', requestLogSchema)
