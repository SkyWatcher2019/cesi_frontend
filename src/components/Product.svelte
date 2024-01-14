<script>

  export let name;
  export let variety;
  export let section;
  export let price;
  export let amount;

  export let id;
</script>

<div class="product flex flex-col justify-between bg-prodmag-0 w-60 2xl:w-80 h-44 p-4 rounded-md shadow">
    <div class="flex flex-row justify-between">
        <div>
            <p class="font-bold">{name}</p>
            <p>{variety}</p>
            <p class="mt-1">{section.name}</p>
        </div>
        <div class="flex flex-col">
            <button class="h-8 rounded shadow bg-white px-2" on:click={() => modalOpen = true}>Изменить</button>
            <button class="h-8 rounded shadow bg-prodmag-10 px-2 mt-2" on:click={() => modalOpen = true}>Удалить</button>
        </div>
    </div>
    <div>
        <p>Цена: {price}р.</p>
        <p>В наличии: {amount}</p>
    </div>
</div>

<style>
    @media (min-width: 1700px) {
        .product {
            width: 24rem;
        }
    }
</style>