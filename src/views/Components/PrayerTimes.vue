<template>
  <p class="ion-text-center">{{ countdown }}</p>
  <ion-list v-if="prayerTimesToday.length > 0" lines="none">
    <ion-item v-for="(prayerTime, index) in prayerTimesToday" :key="index" :class="{ 'current': currentPrayerIndex === index }" class="rounded">
      <ion-label>{{ getPrayerTitle(index) }}</ion-label>
      <ion-label class="ion-float-end ion-text-end" slot="end">{{ prayerTime }}</ion-label>
    </ion-item>
  </ion-list>
  <ion-text v-else>No prayer times available for today.</ion-text>
</template>
<script setup>
import {IonList, IonItem, IonLabel, IonText} from "@ionic/vue";
import {ref} from 'vue';
import {getPrayerTimes} from '@/services/prayerTimesService';
import moment from "moment";

const prayerTimes = ref({});
const countdown = ref('');
const currentPrayerIndex = ref('');

const currentPrayer = ref([]);
const nextPrayer = ref([]);

const prayerTimesToday = ref([]);
const prayerTimesYesterday = ref([]);
const prayerTimesTomorrow = ref([]);


const getPrayerTitle = (index) => {
  const titles = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];
  return titles[index];
};

const updateCountdown = (targetTime, tomorrow) => {
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }

  const currentTime = moment();
  const duration = moment.duration(targetTime.diff(currentTime));
  const hoursRemaining = padZero(Math.floor(duration.asHours()));
  const minutesRemaining = padZero(duration.minutes());
  const secondsRemaining = padZero(duration.seconds());


  const currentPrayerTitle = (tomorrow ? 'İmsak' : nextPrayer.value.title);
  return `${currentPrayerTitle} Vaktine kalan ${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`;
};

const startCountdown = (endTime, nextDay) => {
  const updateCountdownWrapper = () => {
    if (nextDay) {
      const tomorrow = moment().add(1, 'days');
      const desiredTimeTomorrow = moment(endTime, 'HH:mm');
      const nextDayDate = tomorrow.clone().set({
        hour: desiredTimeTomorrow.hours(),
        minute: desiredTimeTomorrow.minutes(),
        second: 0,
        millisecond: 0,
      });
      countdown.value = updateCountdown(nextDayDate, true);
    } else {
      countdown.value = updateCountdown(moment(endTime, 'HH:mm'));

    }
  };

  updateCountdownWrapper();

  setInterval(updateCountdownWrapper, 1000);

};
const handlePrayerTimes = (offset = 0) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + offset);
  const formattedDate = currentDate.toISOString().split('T')[0];
  return  prayerTimes.value[formattedDate] || [];
};

const fetchPrayerTimes = async () => {
  try {
    const response = await getPrayerTimes();
    prayerTimes.value = response.times;

    prayerTimesToday.value = handlePrayerTimes();
    prayerTimesYesterday.value = handlePrayerTimes(-1);
    prayerTimesTomorrow.value = handlePrayerTimes(+1);

    const currentTime = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
    let nextDay = false;
    for (let i = 0; i < prayerTimesToday.value.length; i++) {
      if(currentTime < prayerTimesToday.value[i])
      {
        if(i === 0){
          currentPrayer.value['index'] = 0
          currentPrayerIndex.value = 0

          currentPrayer.value['time'] = prayerTimesToday.value[0]
          currentPrayer.value['title'] = getPrayerTitle(0)
        } else {
          currentPrayer.value['index'] = i-1
          currentPrayerIndex.value = i-1

          currentPrayer.value['time'] = prayerTimesToday.value[i-1]
          currentPrayer.value['title'] = getPrayerTitle(i-1)
        }

        nextPrayer.value['index'] = i
        nextPrayer.value['time'] = prayerTimesToday.value[i]
        nextPrayer.value['title'] = getPrayerTitle(i)

        break;
      } else {
        if (i === 5){
          currentPrayer.value['index'] = 5
          currentPrayerIndex.value = 5
          currentPrayer.value['time'] = prayerTimesToday.value[5]
          currentPrayer.value['title'] = getPrayerTitle(5)

          nextPrayer.value['index'] = 0
          nextPrayer.value['time'] = prayerTimesTomorrow.value[0]
          nextPrayer.value['title'] = getPrayerTitle(0)
          nextDay = true;

        }
      }
    }

    startCountdown(nextPrayer.value['time'],nextDay);


  } catch (error) {
    console.error('Error fetching prayer times:', error);
  }
};


fetchPrayerTimes();

</script>
<style scoped>
ion-list {
  background: transparent;

  ion-item {
    --background: transparent;
  }
}

.current {
  background: #eee;
  --color: #000;
}
.rounded{
  border-radius: 20px;
}
</style>