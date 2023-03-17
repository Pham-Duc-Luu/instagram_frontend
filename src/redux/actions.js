import actionsType from './actionsType';

// Define your action creators
export const login = (user) => {
    return { type: actionsType.LOGIN, user };
};

export const fetchFeedList = (feedList) => {
    return {
        type: actionsType.FEEDLIST,
        feedList,
    };
};

export const handleLoadingFeed = (loading) => {
    return {
        type: actionsType.LOADINGFEED,
        loadingFeed: loading,
    };
};
