<template>
  <div class="footer">
    <div class="logo">
      <img :src="ImageLogo" />
    </div>
    <div class="info">
      <div class="info__content">
        連絡電話：(04)23217936<br />
        公司地址：台中市西區台灣大道二段406號12樓之2<br />
        公司信箱：liliangclean@gmail.com<br />
        客服時間：週一至週五09:00-12:00,13:30-18:00(不含週六、週日、國定假日)<br />
      </div>

      <div class="info__icons">
        <div class="info__icon">
          <a
            href="https://www.facebook.com/profile.php?id=100093968687360&mibextid=LQQJ4d"
          >
            <img :src="IconFB" />
          </a>
        </div>
        <div class="info__icon">
          <a href="https://lin.ee/8qurIGn"><img :src="IconLine" /></a>
        </div>
        <div class="info__icon">
          <a href="https://instagram.com/liliangclean?igshid=OGQ5ZDc2ODk2ZA==">
            <img :src="IconIG"
          /></a>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright">© 2022 立亮居家家飾清潔 All Rights Reserved.</div>
</template>

<script>
import ImageLogo from '../assets/image/image/image-logo.png';
import IconLine from '../assets/image/icon/icon-line.png';
import IconFB from '../assets/image/icon/icon-fb.png';
import IconIG from '../assets/image/icon/icon-ig.png';

export default {
  name: 'Footer',
  setup() {
    return {
      ImageLogo,
      IconLine,
      IconFB,
      IconIG,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 30px 10vw;
  background-color: var(--second);

  .logo {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 24px;
    .info__content {
      color: var(--black);
      font-size: var(--font-m);
      line-height: 160%;
    }

    .info__icons {
      display: flex;
      justify-content: flex-start;
      .info__icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
      .info__icon ~ .info__icon {
        margin-left: 30px;
      }
    }
  }
}
.copyright {
  background-color: var(--second);
  text-align: center;
  padding-bottom: 16px;
  font-size: var(--font-s);
  color: #fff;
}

@media (max-width: 460px) {
  .footer {
    padding: 34px 10vw 74px 10vw;
    .logo {
      width: 100px;
    }
    .info {
      margin-top: 20px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .info__content {
        font-size: var(--mobile-font-m);
      }
      .info__icons {
        margin-top: 20px;
        align-items: center;
        .info__icon {
          width: 40px;
          height: 40px;
        }
        .info__icon ~ .info__icon {
          margin-left: 40px;
        }
      }
    }
  }
  .copyright {
    font-size: var(--mobile-font-s);
  }
}
</style>
