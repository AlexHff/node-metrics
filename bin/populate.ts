import { User, UserHandler } from "../src/models/User";
import { Metric, MetricHandler } from "../src/models/Metric";

const users = [
    new User("friedrich", "friedrich@google.com", "1234"),
    new User("jeremy", "jeremy.roca@edu.ece.fr", "1234"),
    new User("hugo", "hugo.fougeres@edu.ece.fr", "1234")
];

const metrics = [
    new Metric(1576926490, 1, "friedrich"),
    new Metric(1576926491, 2, "friedrich"),
    new Metric(1576926492, 3, "friedrich"),
    new Metric(1576926493, 4, "jeremy"),
    new Metric(1576926494, 5, "hugo")
];

const userHandler = new UserHandler();

users.forEach(user => {
    userHandler.save(user, (err: Error | null) => {
        if (err) throw err;
    });
});

const metricHandler = new MetricHandler();

metrics.forEach(metric => {
    metricHandler.save(metric, (err: Error | null) => {
        if (err) throw err;
    });
});
