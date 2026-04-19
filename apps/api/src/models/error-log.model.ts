import { Schema, model, type Document } from 'mongoose'

export interface IErrorLog extends Document {
    message: string
    stack?: string
    statusCode: number
    method: string
    url: string
    userId?: string
    userRole?: string
    createdAt: Date
}

const errorLogSchema = new Schema<IErrorLog>(
    {
        message: { type: String, required: true },
        stack: { type: String },
        statusCode: { type: Number, required: true },
        method: { type: String, required: true },
        url: { type: String, required: true },
        userId: { type: String },
        userRole: { type: String }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
)

errorLogSchema.index({ createdAt: -1 })
errorLogSchema.index({ statusCode: 1 })
errorLogSchema.index({ userId: 1 })

export const ErrorLog = model<IErrorLog>('ErrorLog', errorLogSchema)
