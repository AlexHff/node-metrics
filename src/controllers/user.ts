export const getLogin = (req: any, res: any) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("login");
};
