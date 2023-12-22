<template>
  <ion-page>
    <Header/>
    <ion-content class="ion-padding">
      <div class="vakit-info ion-padding-top ion-padding-start">
        <div class="dateContainer">
          <div class="day">
            {{currentDay}}
          </div>
          <div class="monthYear">
            <p class="ion-no-padding ion-no-margin">{{currentMonth}} {{currentYear}}</p>
            <p class="ion-no-padding ion-no-margin">{{currentDayName}}</p>
          </div>
        </div>
      </div>
      <PrayerTimes/>
      <hr/>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {IonPage,IonContent} from "@ionic/vue";
import PrayerTimes from "@/views/Components/PrayerTimes.vue";
import Header from "@/views/Partials/Header.vue";

const currentDate = new Date();
const turkishMonthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const turkishDayNames = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
];

const currentDay = currentDate.getDate().toString();
const currentMonth = turkishMonthNames[currentDate.getMonth()];
const currentYear = currentDate.getFullYear().toString();
const currentDayName = turkishDayNames[currentDate.getDay()];

</script>

<style scoped>
ion-content {
  --padding-top: 80px;
  --background: url('../../../public/background.png') top center / cover no-repeat;
}

.dateContainer{
  display:flex;
  width:150px;
  margin: 0px auto;
  .day{
    font-size:42px;
    color:#fff;
    font-weight:bold;
  }
  .monthYear{
    font-size:16px;
    padding-top:5px;
  }
}
.vakit-info h3 {
  margin-top: 0;
}

.vakit-info ion-list {
  padding-top: 0;
}

.vakit-info p {
  color: var(--ion-color-dark);

  line-height: 130%;
}
</style>