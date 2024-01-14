<script>
  import Dots from './icons/Dots.svelte';

  export let name;
  export let description;
  export let products;
  export let id;
</script>

<div class="product flex flex-col justify-between bg-prodmag-0 w-60 2xl:w-80 h-22 p-4 rounded-md shadow">
    <div class="flex flex-row justify-between">
        <div>
            <p class="font-bold">{name}</p>
            <p>{description}</p>
        </div>
        <Dots/>
    </div>
    <div>
        <p>Продуктов: {products.length}</p>
    </div>
</div>

<style>
    @media (min-width: 1700px) {
        .product {
            width: 24rem;
        }
    }
</style>