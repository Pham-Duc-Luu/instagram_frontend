import acionsType from './actionsType';

// Define your initial state
const initialState = {
    user: {},
    feedList: [],

    categories: [
        { name: 'Animals', link: 'Animals' },
        { name: 'Wallapapers', link: 'Wallapapers' },
        { name: 'Photography', link: 'Photography' },
        { name: 'Movies', link: 'Movies' },
        { name: 'Cars', link: 'Cars' },
        { name: 'Nature', link: 'Nature' },
    ],
    loadingFeed: false,
};

// Define your reducer function
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case acionsType.LOGIN:
            return { ...state, user: action.user };
        case acionsType.FEEDLIST:
            return { ...state, feedList: action.feedList };
        case acionsType.LOADINGFEED:
            return { ...state, loadingFeed: !!action.loadingFeed };

        default:
            return state;
    }
}
