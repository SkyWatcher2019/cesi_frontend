<script>
    import { url } from '@roxi/routify'
</script>

<style>
  .huge {
    font-size: 12rem;
  }
  .e404 {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
</style>

<div class="e404">
  <div class="huge">404</div>
  <div class="big">Page not found. 
  <!-- link to the parent folder of _fallback.svelte -->
  <a href={$url('../')}>Go back</a>
  </div>
</div>
