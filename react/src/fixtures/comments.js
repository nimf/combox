import moment from 'moment';

const commentsFixture = {
  byId: {
    1: {
      id: 1,
      authorName: 'Anonymous',
      isGuest: true,
      createdAt: moment().subtract(3, 'days').utc().format(),
      message: 'Test comment 1',
      parentId: null,
    },
    2: {
      id: 2,
      authorName: 'Anonymous',
      isGuest: true,
      createdAt: moment().subtract(2, 'days').utc().format(),
      message: 'Test comment 2',
      parentId: 1,
    },
    3: {
      id: 3,
      authorName: 'Anonymous',
      isGuest: true,
      createdAt: moment().subtract(1, 'days').utc().format(),
      message: 'Test comment 3',
      parentId: null,
    },
  },
  allIds: [
    1,
    2,
    3,
  ],
};

export default commentsFixture;
