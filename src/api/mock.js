export default {
  'auth/login': {
    code: 1,
    data: {
      token: 'xxccvvssyy',
    },
    message: '成功',
  },
  'member/register': {
    code: 200,
    message: '成功',
    data: {},
  },
  category: {
    code: 200,
    message: '成功',
    data: [
      {
        id: 'a5566c0b-d33e-4acb-a778-8f9cfdc52779',
        name: '居家清潔',
        depiction: '',
        image: 'https://picsum.photos/200/150',
      },
      {
        id: 'a2',
        name: '裝潢細清',
        depiction: '這是<br />後端來的<br />資料',
        image: 'https://picsum.photos/200/150',
      },
      {
        id: 'a3',
        name: '辦公室清潔',
        depiction: '這是<br />後端來的<br />資料',
        image: 'https://picsum.photos/200/150',
      },
      {
        id: '631e550c-50b6-9410-80be-70c9e2ea1ac0',
        name: '定期清潔',
        depiction: '',
        image: 'https://picsum.photos/200/150',
      },
      {
        id: 'a5',
        name: '床墊沙發清洗',
        depiction: '這是<br />後端來的<br />資料',
        image: 'https://picsum.photos/200/150',
      },
    ],
  },
  'category/articleCategory': {
    code: 200,
    message: '成功',
    data: [
      {
        id: 'b1',
        name: '客廳清潔',
      },
      {
        id: 'b2',
        name: '廚房清潔',
      },
      {
        id: 'b3',
        name: '房間清潔',
      },
      {
        id: 'b4',
        name: '房間清潔',
      },
      {
        id: 'b5',
        name: '房間清潔',
      },
      {
        id: 'b6',
        name: '房間清潔房間清潔房間清潔',
      },
    ],
  },
  'category/articleList': {
    code: 200,
    message: '成功',
    data: [
      {
        id: 'c1',
        beforeImage: 'https://picsum.photos/360/300?random=1',
        afterImage: 'https://picsum.photos/360/300?random=2',
        date: '2023/08/08',
        title: '這是文章標題一',
        subTitle:
          '這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述',
      },
      {
        id: 'c2',
        beforeImage: 'https://picsum.photos/360/300?random=1',
        afterImage: 'https://picsum.photos/360/300?random=2',
        date: '2023/08/08',
        title:
          '這是非常長的文章標題這是非常長的文章標題這是非常長的文章標題這是非常長的文章標題這是非常長的文章標題',
        subTitle:
          '這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述',
      },
      {
        id: 'c3',
        beforeImage: 'https://picsum.photos/360/300?random=1',
        afterImage: 'https://picsum.photos/360/300?random=2',
        date: '2023/08/08',
        title: '這是文章標題三',
        subTitle:
          '這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述',
      },
      {
        id: 'c4',
        beforeImage: 'https://picsum.photos/360/300?random=1',
        afterImage: 'https://picsum.photos/360/300?random=2',
        date: '2023/08/08',
        title: '這是文章標題三',
        subTitle:
          '這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述',
      },
      {
        id: 'c5',
        beforeImage: 'https://picsum.photos/360/300?random=1',
        afterImage: 'https://picsum.photos/360/300?random=2',
        date: '2023/08/08',
        title: '這是文章標題三',
        subTitle:
          '這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述這是簡述',
      },
    ],
  },
  'category/article': {
    code: 200,
    message: '成功',
    data: {
      nextId: 'd1-1',
      prevId: 'd1-3',
      title: '這是文章標題',
      description: '這是<br />後端來的<br />資料',
      date: '2023/08/08',
      categoryName: '定期清潔', // 大項名稱
      articleListName: '客廳清潔', // 中項名稱
    },
  },
}
