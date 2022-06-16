import Home from "../page/Home";
import User from "../page/User"
import Error404 from "../page/Error404";
import Music from "../page/Music";
import PlayMusic from "../page/PlayMusic";

export default [
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "/Music",
        exact:true,
        page: Music

    },
    {
        path: "/PlayMusic/:song",
        exact:true,
        page: PlayMusic
    },
    {
        path: "/:id",
        exact: true,
        page: User
    },
    {
        path: "*",
        page: Error404
    }
];