import publicPaths from '../paths';
import Home from '../pages/Home';
import Collection from '../pages/Collection';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist/';
import Download from '../pages/Download';
import Queue from '../pages/Queue';
import Favorite from '../pages/Favorite';
import NewPlayList from '../pages/NewPlayList/NewPlayList';
import Genra from '../pages/Genra';
import Author from '../pages/Author';
const publicRoutes = [
    {
        path: publicPaths.home,
        component: Home,
    },
    {
        path: publicPaths.search,
        component: Search,
    },
    {
        path: publicPaths.favorite,
        component: Favorite,
    },
    {
        path: publicPaths.collection,
        component: Collection,
    },
    {
        path: publicPaths.new,
        component: NewPlayList,
    },
    {
        path: publicPaths.playlist,
        component: Playlist,
    },
    {
        path: publicPaths.download,
        component: Download,
    },
    {
        path: publicPaths.queue,
        component: Queue,
    },
    {
        path: publicPaths.genra,
        component: Genra,
    },
    {
        path: publicPaths.author,
        component: Author,
    },
];

export default publicRoutes;
