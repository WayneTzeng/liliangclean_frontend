export default {
  // 取得活動清單
  Project: {
    code: 1,
    data: {
      stickers: 2,
      exchanges: 1,
      items: [
        {
          name: '瑞穗天合號召鐵粉 入住四晚送格蘭雅緻別墅一晚',
          abbr: '號召鐵粉',
          id: 'AYjhr1owC07',
          projectDate: '2023/05/27 起 ~ 2023/05/27 止',
          awardDate: '2023/05/27 起 ~ 2023/08/27 止',
          bannerImg:
            'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/banner.jpg',
          sticker: 0,
        },
        {
          name: '瑞穗天合國際觀光酒店 FUN暑假享指定房型升等',
          abbr: '號召鐵粉',
          id: 'N2D3ZWDWFV',
          projectDate: '2023/05/27 起 ~ 2023/05/27 止',
          awardDate: '2023/05/27 起 ~ 2023/08/27 止',
          bannerImg:
            'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/banner.jpg',
          sticker: 1,
        },
      ],
    },
    message: '成功',
  },
  // 取得活動 by AYjhr1owC07
  'Project/AYjhr1owC07': {
    code: 1,
    data: {
      name: '瑞穗天合號召鐵粉 入住四晚送格蘭雅緻別墅一晚',
      abbr: '號召鐵粉',
      introduction: '簡介',
      explain: '說明',
      url: 'https://www.grandcosmos.com.tw/',
      phone: '886-3-887-6000',
      id: 'AYjhr1owC07',
      projectDate: '2023/05/27 起 ~ 2023/05/27 止',
      bannerImg:
        'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/banner.jpg',
      stickerImg:
        'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/sticker.png',
      sticker: 11,
    },
    message: '成功',
  },
  // 取得活動 by N2D3ZWDWFV
  'Project/N2D3ZWDWFV': {
    code: 1,
    data: {
      name: '瑞穗天合國際觀光酒店 FUN暑假享指定房型升等',
      abbr: '號召鐵粉',
      introduction: '簡介',
      explain: '說明',
      url: 'https://www.grandcosmos.com.tw/',
      phone: '886-3-887-6000',
      id: 'AYjhr1owC07',
      projectDate: '2023/05/27 起 ~ 2023/05/27 止',
      bannerImg:
        'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/banner.jpg',
      stickerImg:
        'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/sticker.png',
      sticker: 2,
    },
    message: '成功',
  },
  // 取得禮物清單
  'Project/mock/awards': {
    code: 1,
    data: [
      {
        id: 1,
        name: '格蘭雅緻別墅一晚',
        img:
          'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
        isFinished: false,
      },
      {
        id: 2,
        name: '測試別墅一晚',
        img:
          'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
        isFinished: true,
      },
      {
        id: 3,
        name: '測試別墅一晚',
        img:
          'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
        isFinished: false,
      },
    ],
    message: '成功',
  },
  // 取得禮物 by 1
  'Project/mock/awards/1': {
    code: 1,
    data: {
      name: '格蘭雅緻別墅一晚',
      explain: '說明',
      exchangeLimit: 0,
      id: 1,
      img: 'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
      isFinished: false,
    },
    message: '',
  },
  // 取得禮物 by 2
  'Project/mock/awards/2': {
    code: 1,
    data: {
      name: '格蘭雅緻別墅一晚',
      explain: '說明',
      exchangeLimit: 0,
      id: 2,
      img: 'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
      isFinished: true,
    },
    message: '',
  },
  // 取得禮物 by 3
  'Project/mock/awards/3': {
    code: 1,
    data: {
      name: '測試別墅一晚',
      explain: '說明',
      exchangeLimit: 2,
      id: 3,
      img: 'https://cosmos.demo-site.tw/Uploads/Projects/AYjhr1owC07/award.png',
      isFinished: false,
    },
    message: '',
  },
  // 取得集章紀錄
  'Project/mock/collects': {
    code: 1,
    data: [
      {
        hotelName: '天成大飯店-2',
        hotelUnitName: '客房部',
        gettingDateTime: '2023/05/28 10:22',
        checkInDate: '2023-05-02',
        packageDate: '2023-05-02',
        sticker: 1,
      },
      {
        hotelName: '天成大飯店-3',
        hotelUnitName: '客房部',
        gettingDateTime: '2023/05/28 10:22',
        checkInDate: '2023-05-03',
        packageDate: '2023-05-03',
        sticker: 1,
      },
      {
        hotelName: '天成大飯店-1',
        hotelUnitName: '客房部',
        gettingDateTime: '2023/05/28 10:22',
        checkInDate: '2023-05-01',
        packageDate: '2023-05-01',
        sticker: 1,
      },
    ],
    message: '',
  },
  // 取得贈禮紀錄
  'Project/mock/tickets': {
    code: 1,
    data: [
      {
        name: '格蘭雅緻別墅一晚',
        gettingDateTime: '2023/05/25 00:42',
        ciId: 254,
        validFrom: '2023-05-10',
        validUntil: '2023-12-31',
        couponNo: '1234-5678-9000',
      },
    ],
    message: '',
  },
};
