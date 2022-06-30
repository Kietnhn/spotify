import Home from '../pages/Home';
import Collection from '../pages/Collection';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist/';
import Download from '../pages/Download';
import Queue from '../pages/Queue';
import Favorite from '../pages/Favorite';
import NewPlayList from '../pages/NewPlayList/NewPlayList';
import Genra from '../pages/Genra';
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/favorite',
        component: Favorite,
    },
    {
        path: '/collection',
        component: Collection,
    },
    {
        path: '/new',
        component: NewPlayList,
    },
    {
        path: '/playlist',
        component: Playlist,
    },
    {
        path: '/download',
        component: Download,
    },
    {
        path: '/queue',
        component: Queue,
    },
    {
        path: '/genra',
        component: Genra,
    },
];

export default publicRoutes;
