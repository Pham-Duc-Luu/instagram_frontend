export const userQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`;
    return query;
};

export const feedQuery = () => {
    const query = `*[_type == 'pin'] | order(_createdAt) {
        image {
            asset -> {url}
        },
        _id, 
        about,
        title, 
        destinaion,
        category,

        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const pinQuery = (pinterm) => {
    const query = `*[_type == 'pin' &&  _id == '${pinterm}']  {
        image {
            asset -> {url}
        },
        _id,
        about,
        title, 
        destinaion,
        category,
         comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const morePinQuery = (pin) => {
    const query = `*[_type == 'pin' && category == '${pin?.category}' &&  _id != '${pin?._id}']  {
        image {
            asset -> {url}
        },
        _id,
        about,
        title, 
        destinaion,
        category,
         comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const userPinQuery = (ref) => {
    const query = `*[_type == 'pin' && postedBy._ref == '${ref}' ]  {
        image {
            asset -> {url}
        },
        _id,
        about,
        title, 
        destinaion,
        category,
         comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const userPinsSave = (ref) => {
    const query = `*[_type == 'pin' && postedBy._ref == '${ref}' ]  {
        image {
            asset -> {url}
        },
        _id,
        about,
        title, 
        destinaion,
        category,
         comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'pin' && 
            title match '${searchTerm}*' || 
            about match '${searchTerm}*' || 
            category match '${searchTerm}*' 
        ]  {
        image {
            asset -> {url}
        },
        _id,
        about,
        title, 
        destinaion,
        category,
         comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          },
        postedBy -> {
            _id,
            userName,
            image,
        },
        save[] {
            key,
            postedBy -> {
                _id,
                userName,
                image,
            },
        }
    }`;
    return query;
};

export const categoryQuery = (searchTerm) => {
    const query = `*[_type == 'pin' && 
    category match '${searchTerm}*' 
]  {
image {
    asset -> {url}
},
_id,
about,
title, 
destinaion,
category,
 comments[]{
    comment,
    _key,
    postedBy->{
      _id,
      userName,
      image
    },
  },
postedBy -> {
    _id,
    userName,
    image,
},
save[] {
    key,
    postedBy -> {
        _id,
        userName,
        image,
    },
}
}`;
    return query;
};
