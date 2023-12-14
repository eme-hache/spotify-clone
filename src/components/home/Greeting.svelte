<script lang="ts">
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let greetings = ''

  if (currentHour < 12) {
    greetings = 'Good morning'
  } else if (currentHour < 18) {
    greetings = 'Good afternoon'
  } else {
    greetings = 'Good evening'
  }
</script>

<h2 class="text-[1.95rem] font-bold text-base-white mb-[14px] tracking-tight">
  {greetings}
</h2>