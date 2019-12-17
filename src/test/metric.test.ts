import { Metric, MetricHandler } from "../models/Metric";

const handler = new MetricHandler();

describe("Metric", function() {
    describe("#save()", function() {
        it("should save without error", function(done) {
            const metric = new Metric(1576572333, 999, "friedrich");
            handler.save(metric, (err) => {
                if (err) done(err);
                else done();
            });
        });
    });

    describe("#get()", function() {
        it("should get without error", function(done) {
            handler.get("friedrich", "1576572333", (err, metric: any) => {
                if (err) done(err);
                else done();
            });
        });
    });

    describe("#getAll()", function() {
        it("should get all without error", function(done) {
            handler.getAll("friedrich", (err, metrics: any) => {
                if (err) done(err);
                else done();
            });
        });
    });

    describe("#delete()", function() {
        it("should delete without error", function(done) {
            handler.get("friedrich", "1576572333", (err, metric: any) => {
                if (err) done(err);
                handler.delete(metric, (err) => {
                    if (err) done(err);
                    else done();
                });
            });
        });
    });
});
