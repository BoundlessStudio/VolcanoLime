<template>
  <div class="font-bold text-4xl font-logo flex gap-2 justify-center">
    <font-awesome-icon :icon="['fas', 'volcano']" class="fill-gradient-radial" aria-hidden="true" />
    <span class="text-neutral-600">Volcano Lime</span>
    <font-awesome-icon :icon="['fas', 'lemon']" class="fill-gradient-linear" aria-hidden="true" />
  </div>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg-settings">
    <defs>
      <linearGradient id="linear">
        <stop class="linear-stop1" offset="0%"></stop>
        <stop class="linear-stop2" offset="100%"></stop>
      </linearGradient>
      <radialGradient id="radial">
          <stop class="radial-stop1" offset="0%"></stop>
          <stop class="radial-stop2" offset="100%"></stop>
        </radialGradient>
    </defs>
  </svg>
</template>

<style>
.svg-settings {
  /* Hiding this content since it's just settings. See - https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}
.fill-gradient-linear path {
  fill: url(#linear);
}
/* setting colors for linear gradient */
.linear-stop1 {
  stop-color: #4dff4d;
}
.linear-stop2 {
  stop-color: #089620;
}
/* radial gradient */
.fill-gradient-radial path {
  fill: url(#radial);
}
/* setting colors for radial gradient */
.radial-stop1 {
  stop-color: #ff8e4d ;
}
.radial-stop2 {
  stop-color: #fd5310;
}

</style>