<script>
  import Section from '../components/Section.svelte';
  import { fetchSections } from '../lib/libs';
  import { page } from '@roxi/routify';

  let modalOpen = false;

  let formData = {};

  async function handleSubmit() {
    formData.price = Number(formData.price);
    formData.amount = Number(formData.amount);
    formData.section_id = Number(formData.section_id);
    fetch('http://localhost:8000/sections/new', {
      method: 'POST', body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        modalOpen = false;
        $page.reset();
      });
  }
</script>

<div class="w-full flex flex-col justify-between pt-2 ">
    <button class="h-8 rounded shadow bg-white px-2 w-fit" on:click={() => modalOpen = true}>Добавить</button>
    <div class="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-6 xl:gap-6">
        {#await fetchSections()}
            Loading
        {:then sections}
            {#if sections.length}
                {#each sections as section}
                    <Section {...section}/>
                {/each}
            {:else}
                <h1>Отделы отсутствуют</h1>
            {/if}
        {:catch e}
            {e}
        {/await}
    </div>
</div>
{#if modalOpen}
    <div class="absolute top-0 left-0 w-screen min-h-screen flex flex-col items-center justify-center modalShadow">
        <form action="sections/new" class="p-4 pt-2 rounded-md bg-prodmag-0 flex flex-col"
              on:submit|preventDefault={handleSubmit}>
            <h1 class="text-xl text-center font-semibold">Добавить отдел</h1>
            <input type="text" class="mt-2" id="name" placeholder="Название" required bind:value={formData.name}>
            <input type="text" class="mt-4" id="description" placeholder="Описание" required
                   bind:value={formData.description}>
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