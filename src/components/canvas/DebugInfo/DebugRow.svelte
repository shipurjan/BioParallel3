<script lang="ts">
  export let title: string;
</script>

<span class="flex h-full items-center font-black">{title}</span>
<span class="grid h-full grid-cols-5 items-center">
  <slot />
</span>
