<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet :animated="true"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="vakitler" href="/vakitler">
          <ion-icon :icon="timerOutline"></ion-icon>
          <ion-label>Vakitler</ion-label>
        </ion-tab-button>

        <ion-item>
          <Logo/>
        </ion-item>

        <ion-tab-button tab="ayarlar" href="/ayarlar">
          <ion-icon :icon="settingsOutline"></ion-icon>
          <ion-label>Ayarlar</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/vue';
import {timerOutline, settingsOutline} from "ionicons/icons";
import Logo from "@/views/Partials/Logo.vue";

</script>
