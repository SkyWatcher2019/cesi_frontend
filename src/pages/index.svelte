<script>
  import Product from '../components/Product.svelte';
  import { fetchProducts, fetchSections, createProduct } from '../lib/libs';
  import { onMount } from 'svelte';
  import { page } from '@roxi/routify';

  let sections = [];
  let selectedSection = '-1';
  let modalOpen = false;

  let formData = {};

  onMount(async () => {
    sections = await fetchSections();
  });

  async function handleSubmit() {
    formData.price = Number(formData.price);
    formData.amount = Number(formData.amount);
    formData.section_id = Number(formData.section_id);
    createProduct(formData)
      .then(() => {
        modalOpen = false;
        $page.reset();
      });
  }
</script>

<div class="w-full flex flex-col justify-between pt-2">
    <div class="flex flex-row">
        <select class="h-8 w-[240px] rounded shadow flex flex-row justify-between items-center px-2"
                bind:value={selectedSection}>
            <option value="-1" selected>Все</option>
            {#each sections as section}
                <option value={section.id}>{section.name}</option>
            {/each}
        </select>
        <button class="h-8 rounded shadow bg-white px-2 ml-2" on:click={() => modalOpen = true}>Добавить</button>
    </div>
    {#key selectedSection}
        <div class="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-6 xl:gap-6">
            {#await fetchProducts(selectedSection)}
                Loading
            {:then products}
                {#if products.length}
                    {#each products as product}
                        <Product {...product}/>
                    {/each}
                {:else}
                    <h1>Продукты отсутствуют</h1>
                {/if}
            {:catch e}
                {e}
            {/await}
        </div>
    {/key}
</div>
{#if modalOpen}
    <div class="absolute top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-center modalShadow">
        <form action="products/new" class="p-4 pt-2 rounded-md bg-prodmag-0 flex flex-col"
              on:submit|preventDefault={handleSubmit}>
            <h1 class="text-xl text-center font-semibold">Добавить продукт</h1>
            <div class="flex flex-row mt-2">
                <input type="text" id="name" placeholder="Название" required bind:value={formData.name}>
                <input type="text" class="ml-4" id="variety" placeholder="Сорт" required bind:value={formData.variety}>
            </div>
            <div class="flex flex-row mt-4">
                <input type="number" id="price" placeholder="Цена" required bind:value={formData.price}>
                <input type="number" class="ml-4" id="amount" placeholder="Количество" required
                       bind:value={formData.amount}>
            </div>
            <label for="section_id" class="mt-4">Категория</label>
            <select id="section_id" class="rounded-md shadow w-full p-1" required bind:value={formData.section_id}>
                {#each sections as section}
                    <option value={section.id}>{section.name}</option>
                {/each}
            </select>
            <div class="flex flex-row mt-4 w-full">
                <button type="submit" class="w-full bg-white rounded p-1">Добавить</button>
                <button class="ml-4 w-full bg-prodmag-10 rounded p-1" on:click={() => modalOpen = false}>Отменить
                </button>
            </div>
        </form>
    </div>
{/if}

<style>
    .modalShadow {
        background-color: rgba(0, 0, 0, .2);
    }

    input {
        padding: 4px;
        border-radius: 6px;
        --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
</style>