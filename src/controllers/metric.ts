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
        if (err) return res.redirect("/");
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
export const getMetric = (req: any, res: any, next: any) => {
    handler.get(req.user.username, req.params.id, (err, metric: any) => {
        console.log(metric);
        console.log(err);
        if (err) return res.redirect("/");
        //if (err) return next(err);
        res.render("metric/one", {
            metric: metric
        });
    });
};

/**
 * GET /metric/new
 * Form to insert a new metric
 * @param req 
 * @param res 
 */
export const getNewMetric = (req: any, res: any) => {
    res.render("metric/new");
};

/**
 * POST /metric/new
 * Insert a new metric
 * @param req 
 * @param res 
 */
export const postNewMetric = (req: any, res: any) => {
    const metric = new Metric(0, req.body.value, req.user.username);
    handler.save(metric, (err) => {
        res.render("metric/one", {
            metric: metric
        });
    });
};

/**
 * POST /metric
 * Update an existing metric
 * @param req 
 * @param res 
 * @param next 
 */
export const postUpdateMetric = (req: any, res: any, next: any) => {
    handler.get(req.user.username, req.body.timestamp, (err, metric: any) => {
        if (err) return next(err);
        metric.value = req.body.value || "";
        handler.save(metric, (err) => {
            res.render("metric/one", {
                metric: metric
            });
        });
    });
};

/**
 * POST /metric
 * Delete a metric
 * @param req 
 * @param res 
 * @param next 
 */
export const postDeleteMetric = (req: any, res: any, next: any) => {
    handler.get(req.user.username, req.body.timestamp, (err, metric: any) => {
        if (err) return next(err);
        handler.delete(metric, (err) => {
            res.redirect("/");
        });
    });
};
