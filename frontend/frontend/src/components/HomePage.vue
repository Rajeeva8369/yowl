<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Initialisation du router
const router = useRouter();

// États réactifs
const showCookieBanner = ref(false);
const showPremiumBanner = ref(false);

// Vérification du consentement aux cookies
onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  console.log("🔍 Valeur de localStorage.cookieConsent:", consent);

  if (!consent || consent === "null" || consent === "undefined") {
    console.log("📢 Affichage du bandeau cookies !");
    showCookieBanner.value = true;
  }
});

// ✅ Gestion des choix de cookies
const onAccept = () => {
  localStorage.setItem("cookieConsent", "true");
  showCookieBanner.value = false;
  showPremiumBanner.value = false;
  console.log("✅ Cookies acceptés !");
};

const onDecline = () => {
  localStorage.setItem("cookieConsent", "false");
  showCookieBanner.value = false;
  showPremiumBanner.value = true; // ✅ Affichage immédiat du Premium
  console.log("❌ Cookies refusés !");
};

const confirmDecline = () => {
  showPremiumBanner.value = false;
  console.log("✅ Refus des cookies confirmé !");
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <!-- HEADER -->
    <header class="bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/logo.png" alt="MediTrust Logo" class="h-10" />
        <h1 class="text-3xl font-bold tracking-wide">MediTrust</h1>
      </div>
      <router-link to="/Parameter">
        <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition border border-gray-600">
          Account
        </button>
      </router-link>
    </header>

    <!-- CONTENU PRINCIPAL -->
    <main class="flex-1 p-6 space-y-8 max-w-3xl mx-auto">
      <!-- Zone de création de post -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <textarea
          class="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows="4"
          placeholder="What's on your mind?"
        ></textarea>
        <button class="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition w-full border border-gray-600">
          Post
        </button>
      </div>
      <!-- Liste des posts -->
      <div class="space-y-6">
        <!-- Premier post -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 border border-gray-700">
          <div class="flex items-center space-x-4">
            <img src="https://yt3.googleusercontent.com/gupO1lvHk2XOg82UrvkG0lFFY8iw7r6y0HcKjaoOOWilFxjcO_8vQbgXduHVtLBsv932TymLjA=s900-c-k-c0x00ffffff-no-rj"
              alt="User" class="w-12 h-12 rounded-full border-2 border-gray-500" />
            <div>
              <p class="font-semibold text-gray-200">TF1</p>
              <p class="text-gray-500 text-sm">2 hours ago</p>
            </div>
          </div>
          <p class="text-gray-300">Trêve à Gaza : Israël confirme avoir libéré 200 détenus...</p>
          <img src="https://i.cbc.ca/1.7433079.1737150061!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/gaza.jpg"
            class="rounded-lg border border-gray-600" />
        </div>

        <!-- Deuxième post -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 border border-gray-700">
          <div class="flex items-center space-x-4">
            <img src="https://yt3.ggpht.com/-uYnyeu0wFpQ/AAAAAAAAAAI/AAAAAAAAAAA/VU2Ct3J_ZQw/s900-c-k-no/photo.jpg"
              alt="User" class="w-12 h-12 rounded-full border-2 border-gray-500" />
            <div>
              <p class="font-semibold text-gray-200">Sky News</p>
              <p class="text-gray-500 text-sm">4 hours ago</p>
            </div>
          </div>
          <p class="text-gray-300">Binotto and the Audi project: "It will be a long journey"</p>
          <img src="https://cdn-1.motorsport.com/images/amp/YMd98vv2/s800/mattia-binotto-directeur-des-o.webp"
            class="rounded-lg border border-gray-600" />
        </div>
      </div>
    
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-gray-500 py-4 text-center text-sm mt-8 border-t border-gray-800">
      <p>&copy; 2025 MediTrust. All rights reserved.</p>
    </footer>

    <!-- ✅ POP-UP COOKIES (Première fenêtre) -->
    <div v-if="showCookieBanner" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center">
        <h2 class="text-2xl font-bold text-gray-900">MediTrust et vos données</h2>
        <p class="mt-4 text-gray-700">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience.
          Vous pouvez accepter ou refuser ces cookies.
        </p>
        <div class="mt-6 flex flex-col gap-4">
          <button @click="onAccept" class="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Tout Accepter
          </button>
          <button @click="onDecline" class="bg-gray-400 text-white px-6 py-2 rounded-lg">
            Tout Refuser
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ POP-UP PREMIUM (Style TF1 avec grille des options) -->
    <div v-if="showPremiumBanner" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h2 class="text-2xl font-bold text-gray-900">Accès Premium Requis</h2>
        <p class="mt-4 text-gray-700">
          Vous avez refusé les cookies. Pour accéder gratuitement aux contenus, vous devez les accepter.
          Sinon, profitez d'une expérience sans publicité avec MediTrust Premium.
        </p>

        <!-- ✅ Grille des options (comme TF1) -->
        <table class="w-full mt-4 text-gray-700 border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border">Option</th>
              <th class="p-2 border">Tout Refuser</th>
              <th class="p-2 border">Tout Accepter</th>
              <th class="p-2 border">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 border">Accès aux extraits</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
            </tr>
            <tr>
              <td class="p-2 border">Accès complet</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">✅</td>
              <td class="p-2 border">✅</td>
            </tr>
            <tr>
              <td class="p-2 border">Sans publicité</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">❌</td>
              <td class="p-2 border">✅</td>
            </tr>
          </tbody>
        </table>

        <div class="mt-6 flex flex-col gap-4">
          <button @click="onAccept" class="bg-sky-600 text-white px-6 py-2 rounded-lg">
            Modifier et tout accepter
          </button>
          <button @click="confirmDecline" class="bg-gray-400 text-white px-6 py-2 rounded-lg">
            Confirmer votre refus
          </button>
          <button class="bg-emerald-500 text-white px-6 py-2 rounded-lg">
            Passer à Premium - 5,99€/mois
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
</style>
