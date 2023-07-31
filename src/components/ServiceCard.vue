<template>
  <div class="service-card">
    <div class="image">
      <img :src="service.image" />
    </div>
    <div class="content">
      <div class="title">{{ service.title }}</div>
      <div v-if="service.subTitle.length" class="sub-title">
        <div v-for="(subTitle, idx) in service.subTitle" :key="idx">
          {{ subTitle }}
        </div>
      </div>
      <div class="can-do__box">
        <div v-for="(canDo, idx) in service.can" :key="idx" class="can-do">
          {{ canDo }}
        </div>
      </div>
      <div class="cant-do__box">
        <div v-for="(cantDo, idx) in service.cant" :key="idx" class="cant-do">
          {{ cantDo }}
        </div>
      </div>
      <div class="schedule">
        <div class="schedule-icon">
          <img :src="IconClock" />
        </div>
        <div class="schedule-progress">
          <div class="desc">
            <span>{{ service.desc[0] }}</span>
            <span>{{ service.desc[1] }}</span>
          </div>
          <div class="progress-bar"></div>
          <div class="estimated-time">
            <span>{{ service.estimatedTime[0] }}</span>
            <span>{{ service.estimatedTime[1] }}</span>
          </div>
          <div class="notice">{{ service.notice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconClock from '../assets/image/icon/icons-clock.svg'

export default {
  name: 'ServiceCardComponent',
  components: {},
  props: {
    service: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      IconClock,
    }
  },
}
</script>

<style lang="scss" scoped>
.service-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 8px 0px #888888;
  margin-top: 30px;

  .image {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .content {
    padding: 16px;
    .title {
      font-size: var(--font-l);
    }
    .sub-title {
      margin-top: 8px;

      display: flex;
      justify-content: flex-start;
      div {
        height: 28px;
        padding: 4px 16px;
        line-height: 18px;
        font-size: var(--font-s);
        color: var(--white);
        background-color: var(--light-gray);
        border-radius: 16px;
        margin-left: 16px;
      }
    }

    .can-do__box,
    .cant-do__box {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .can-do,
      .cant-do {
        width: calc(50% - 16px);
        margin-left: 16px;
        position: relative;
        line-height: 20px;
      }
    }

    .can-do__box {
      .can-do {
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: -16px;
        }
      }
    }

    .cant-do__box {
      .cant-do {
        &::before,
        &::after {
          content: '';
          width: 14px;
          height: 2px;
          background: var(--second);
          border-radius: 2px;
          position: absolute;
          top: 9px;
          left: -18px;
        }
        &::before {
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }
      }
    }

    .schedule {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;

      .schedule-icon {
        width: 40px;
        img {
          width: 100%;
        }
      }
      .schedule-progress {
        width: 100%;
        position: relative;
        margin-left: 16px;

        .desc,
        .estimated-time {
          display: flex;
          font-size: var(--font-s);
          justify-content: space-between;
        }
        .progress-bar {
          height: 4px;
          margin: 16px 0;
          background-color: var(--gray);
          position: relative;

          &::before,
          &::after {
            content: '';
            width: 4px;
            height: 20px;
            background: var(--gray);
            position: absolute;
            top: -8px;
          }

          &::before {
            left: 0;
          }
          &::after {
            right: 0;
          }
        }
        .notice {
          margin-top: 16px;
          font-size: var(--font-s);
          color: var(--gray);
        }
      }
    }
  }
}

.service-card ~ .service-card {
  margin-left: 30px;
}

.service-card:nth-child(3n + 1) {
  margin-left: 0;
}

.service-card:nth-child(1),
.service-card:nth-child(2),
.service-card:nth-child(3) {
  margin-top: 0;
}

@media (max-width: 1060px) {
  .service-card {
    margin-top: 30px !important;
    margin-left: 30px !important;
  }

  .service-card:nth-child(2n + 1) {
    margin-left: 0 !important;
  }

  .service-card:nth-child(1),
  .service-card:nth-child(2) {
    margin-top: 0;
  }
}

@media (max-width: 760px) {
  .service-card {
    margin-left: 0 !important;
    margin-top: 30px;
  }
}
</style>
