<template>
  <div class="order-detail">
    <v-app>
      <v-main>
        <v-container class="fill-height">
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closeCard">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-text>
                  <div class="info-block">
                    <div class="title">訂購人資訊</div>
                    <div>姓名:{{ name }}</div>
                    <div>電話:{{ phone }}</div>
                    <div>mai: {{ email }}</div>
                    <div>地址:{{ address }}</div>
                    <div>備註:{{ note }}</div>
                  </div>
                  <div class="info-block">
                    <div class="title">服務內容</div>
                    <div>服務類型: {{ serviceType }}</div>
                    <div>坪數: {{ squareMeter }}</div>
                    <div>訂購日期: {{ orderDate }}</div>
                    <div>服務內容: {{ serviceContent }}</div>
                  </div>
                  <div class="info-block">
                    <div class="title">服務時間</div>
                    <div>服務日期: {{ serviceDate }}</div>
                    <div>服務時段: {{ serviceTime }}</div>
                  </div>
                  <div class="info-block">
                    <div class="title">費用資訊</div>
                    <div>訂單總金額: {{ totalAmount }}</div>
                    <div>付款方式: {{ paymentMethod }}</div>
                    <div>付款狀態: {{ paymentStatus }}</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OrderDetailCardComponent',
  components: {},
  emits: ['close-order-card'],
  setup(props, { emit }) {
    const name = ref('xxx')
    const phone = ref('xxx')
    const email = ref('xxx')
    const address = ref('xxx')
    const note = ref('xxx')

    const orderDate = ref('xxx')
    const serviceType = ref('xxx')
    const squareMeter = ref('xxx')
    const serviceContent = ref('xxx')

    const serviceDate = ref('xxx')
    const serviceTime = ref('xxx')

    const totalAmount = ref('xxx')
    const paymentMethod = ref('xxx')
    const paymentStatus = ref('xxx')

    const closeCard = () => {
      emit('close-order-card', false)
    }

    return {
      name,
      phone,
      email,
      address,
      note,
      orderDate,
      serviceType,
      squareMeter,
      serviceContent,
      serviceDate,
      serviceTime,
      totalAmount,
      paymentMethod,
      paymentStatus,
      closeCard,
    }
  },
}
</script>

<style lang="scss" scoped>
.order-detail {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;
  top: 0;

  :deep(.v-application) {
    background: rgba(0, 0, 0, 0.5) !important;
  }

  :deep(.v-card-actions) {
    min-height: 32px;
    max-height: 44px;
  }

  :deep(.v-card-text) {
    padding: 0 32px 32px 32px;
  }

  .info-block {
    border: 1px solid var(--primary);
    border-radius: 8px;
    overflow: hidden;
    padding: 0 0 8px 0;
    .title {
      font-size: var(--font-s);
      font-weight: 500;
      /* color: var(--primary); */
      color: var(--white);
      padding: 4px 8px;
      background-color: var(--primary);
      /* border-bottom: 1px solid var(--primary); */
    }
    div:not(.title) {
      font-size: var(--font-m);
      font-weight: 100;
      color: var(--brown);
      padding: 2px 16px;
    }
  }
  .info-block ~ .info-block {
    margin-top: 16px;
  }
}
</style>
