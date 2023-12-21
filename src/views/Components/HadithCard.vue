<template>

  <ion-card>
    <ion-card-header>
      Hadis-i Şerif
    </ion-card-header>
    <ion-card-content>
      {{ selectedHadith.hadith }}
    </ion-card-content>
    <ion-row class="cardfooter">
      <ion-col>
        <p class="ion-text-end">
          {{ selectedHadith.source }}
        </p>
      </ion-col>
    </ion-row>
  </ion-card>
</template>

<script setup>

import {ref} from "vue";
import {IonCard,IonCardHeader,IonCardContent,IonRow,IonCol} from "@ionic/vue";

const selectedHadith = ref([]);

const hadithArray = [
  {
    hadith: "Her doğan, İslâm fıtratı üzerine doğar. Sonra, anne-babası onu Hristiyan, Yahudi veya Mecusi yapar.",
    source: "Buhârî, cenâiz 92; Ebû Dâvut, sünne 17; Tirmizî, kader 5"
  },
  {
    hadith: "Müslüman, dilinden ve elinden Müslümanların emin olduğu kimsedir. Muhâcir de Allah’ın yasakladığı şeyleri terk edendir.",
    source: "Buhari, Bedu'l-vahy, 4."
  },
  {
    hadith: "İnsanlara merhamet etmeyene Allah merhamet etmez.",
    source: "Müslim, Fedâil, 66; Tirmizî, Birr, 16"
  },
  {
    hadith: "Hayra vesile olan, hayrı yapan gibidir.",
    source: "Tirmizî, İlim, 14."
  },
  {
    hadith: "İki göz vardır ki, cehennem ateşi onlara dokunmaz: Allah korkusundan ağlayan göz, bir de gecesini Allah yolunda nöbet tutarak geçiren göz.",
    source: "Tirmizî, Fedâilü’l-Cihâd, 12."
  },
  {
    hadith: "(Mü’min) kardeşinle münakaşa etme, onun hoşuna gitmeyecek şakalar yapma ve ona yerine getirmeyeceğin bir söz verme.",
    source: "Tirmizî, Birr, 58."
  },
  {
    hadith: "Allah, her işte ihsanı (güzel davranmayı) emretmiştir.",
    source: "Müslim, Sayd ve Zebâih, 57."
  }
];

const loadRandomHadith = () => {
  const randomIndex = Math.floor(Math.random() * hadithArray.length);
  selectedHadith.value = hadithArray[randomIndex];
}

loadRandomHadith();
</script>

<style scoped>
ion-card-header{
  color: var(--ion-color-primary);
}
ion-card{
  border-radius: 20px;
  padding: 10px;
}
.cardfooter {
  text-align: right;
  font-size:10px;
  font-style: italic;
}
</style>
