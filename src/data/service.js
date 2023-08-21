import service1 from '../assets/image/image/image-service-01.jpg'
import service2 from '../assets/image/image/image-service-02.jpg'
import service3 from '../assets/image/image/image-service-03.jpg'
import service4 from '../assets/image/image/image-service-04.jpg'
import service5 from '../assets/image/image/image-service-05.jpg'
import service6 from '../assets/image/image/image-service-06.jpg'
import service7 from '../assets/image/image/image-service-07.jpg'

export default {
  contentList: [
    [
      {
        title: '客廳清潔',
        subTitle: [],
        can: [
          '沙發擦拭',
          '地毯除塵',
          '桌、櫃擦拭',
          '地板清潔',
          '燈具表面擦拭',
          '雜物整理',
          '垃圾打包'
        ],
        cant: ['沙發深層污漬', '地毯深層污漬', '天花板層板清潔', '吊燈清潔'],
        estimatedTime: ['0.5hr', '1.5hr'],
        desc: ['普通清潔', '空間大、許久未清潔'],
        notice: '',
        image: service1
      },
      {
        title: '廚房清潔',
        subTitle: [],
        can: [
          '瓦斯爐台',
          '集油槽油污處理',
          '排油煙機',
          '櫥櫃外觀擦拭',
          '冰箱外觀擦拭',
          '烤漆玻璃清潔',
          '流理臺',
          '垃圾打包',
          '地板清潔'
        ],
        cant: ['排油煙機內機拆洗', '廚餘清理'],
        estimatedTime: ['1.5hr', '3hr'],
        desc: ['普通清潔', '重油汙、許久未清潔'],
        notice: '冰箱內部清潔、整理＋1-1.5小時',
        image: service2
      },
      {
        title: '房間清潔',
        subTitle: [],
        can: [
          '家電外觀清潔',
          '衣櫃外觀擦拭',
          '被褥整理',
          '雜物整理',
          '床單換洗',
          '桌、櫃面擦拭',
          '垃圾打包',
          '地板清潔'
        ],
        cant: ['移動大型家具或家電', '整理衣櫃內部衣服'],
        estimatedTime: ['0.5hr', '1hr'],
        desc: ['普通清潔', '空間大、許久未清潔'],
        notice: '',
        image: service3
      },
      {
        title: '浴室清潔',
        subTitle: [],
        can: [
          '乾濕玻璃',
          '浴缸清潔',
          '馬桶刷洗',
          '流理臺整理',
          '鏡面清潔',
          '抽風機濾網',
          '垃圾打包',
          '小範圍除黴',
          '水垢、皂垢清除'
        ],
        cant: ['櫃內清潔'],
        estimatedTime: ['0.5hr', '2.5hr'],
        desc: ['普通清潔', '垢重、許久未清潔'],
        notice: '全區除霉請洽客服人員',
        image: service4
      },
      {
        title: '陽台清潔',
        subTitle: [],
        can: ['曬衣桿外觀擦拭', '家電外觀擦拭', '地板清潔', '雜物整理'],
        cant: ['鳥巢移除', '除蟲害', '園藝整理'],
        estimatedTime: ['0.5hr', '1.5hr'],
        desc: ['普通清潔', '空間大、許久未清潔'],
        notice: '',
        image: service5
      },
      {
        title: '窗戶清潔',
        subTitle: [],
        can: ['窗框', '', '窗溝', '', '紗窗', '', '窗戶玻璃'],
        cant: ['拆卸窗戶', '', '拆卸窗簾、清洗', '', '爬出窗外'],
        estimatedTime: ['0.5hr/扇', '0.75hr/扇'],
        desc: ['普通清潔', '窗戶大、許久未清潔'],
        notice: '',
        image: service6
      },
      {
        title: '洗衣晾曬',
        subTitle: [],
        can: ['衣物清洗', '', '衣物晾曬', '', '需備有洗衣機'],
        cant: ['手洗衣物', '', '熨燙衣物', '', '特殊衣物ex:羊毛、羽絨'],
        estimatedTime: ['1hr', '2hr'],
        desc: ['普通清潔', '衣物多'],
        notice: '',
        image: service7
      }
    ]
  ],
  tabList: ['居家清潔', '裝潢細清', '辦公室清潔', '定期清潔', '床墊沙發清洗'],
  serviceAreaList: [
    '中區',
    '北區',
    '西區',
    '南區',
    '東區',
    '西屯區',
    '南屯區',
    '北屯區',
    '大里區',
    '太平區',
    '潭子區',
    '大雅區',
    '烏日區'
  ]
}
