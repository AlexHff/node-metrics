import db from "../db";
import { User, UserHandler } from "./User";

const handler = new UserHandler();

export class Metric {
    timestamp: number;
    value: number;
    username: string;

    constructor(timestamp: number, value: number, username: string) {
        if (timestamp === 0) {
            this.timestamp = Math.floor(Date.now() / 1000);
        } else {
            this.timestamp = timestamp;
        }
        this.value = value;
        this.username = username;
        console.log(this);
    }

    static getFromDB(username: string, timestamp: string, value: any): Metric {
        return new Metric(parseInt(timestamp, 10), value, username);
    }
}

export class MetricHandler {
    public getAll(username: string, callback: (err: Error | null, result?: Metric[]) => void) {
        var metrics: Metric[] = [];
        db.createReadStream()
            .on('error', callback)
            .on('data', (data: any) => {
                const [m_type, m_username, m_timestamp] = data.key.toString().split(":");
                if (m_type === "metric" && m_username === username) {
                    metrics.push(new Metric(m_timestamp, data.value, m_username));
                }
            })
            .on('end', (err: Error) => {
                callback(null, metrics);
        });
    }

    public get(username: string, timestamp: string, callback: (err: Error | null, result?: Metric) => void) {
        db.get(`metric:${username}:${timestamp}`, function (err: Error, data: any) {
            if (err) callback(err);
            callback(null, Metric.getFromDB(username, timestamp, data));
        });
    }

    public save(metric: Metric, callback: (err: Error | null) => void) {
        db.put(`metric:${metric.username}:${metric.timestamp}`, `${metric.value}`, (err: Error | null) => {
            callback(err);
        });
    }

    public delete(metric: Metric, callback: (err: Error | null) => void) {
        db.del(`metric:${metric.username}:${metric.timestamp}`, function (err: Error) {
            if (err) callback(err);
        });
    }
}
