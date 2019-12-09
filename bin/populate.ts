import { User, UserHandler } from "../src/models/User";

const users = [
  new User("friedrich", "friedrich@google.com", "1234"),
  new User("jeremy", "jeremy.roca@edu.ece.fr", "1234"),
  new User("hugo", "hugo.fougeres@edu.ece.fr", "1234")
];

const handler = new UserHandler();

users.forEach(user => {
  handler.save(user, (err: Error | null) => {
    if (err) throw err
  })
});
