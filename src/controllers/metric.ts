import { Metric, MetricHandler } from "../models/Metric";

const handler = new MetricHandler();

/**
 * GET /metrics
 * Prints all the user's metrics
 * @param req 
 * @param res 
 */
export const getAllMetrics = (req: any, res: any) => {
    handler.getAll(req.user.username, (err, metrics: any) => {
        res.render("metric/all", {
            metrics: metrics
        });
    });
};

/**
 * GET /metric
 * @param req 
 * @param res 
 */
export const getMetric = (req: any, res: any) => {
    handler.get(req.user.username, req.params.id, (err, metric: any) => {
        res.render("metric/one", {
            metric: metric
        });
    });
};

export const getNewMetric = (req: any, res: any) => {
    res.render("metric/new");
};

export const postNewMetric = (req: any, res: any) => {
    const metric = new Metric(0, req.body.value, req.user.username);
    handler.save(metric, (err) => {
        res.render("metric/one", {
            metric: metric
        });
    });
};
