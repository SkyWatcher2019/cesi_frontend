<script>
    export let active = false;
    export let text;
    export let url;
</script>

<a href={url} class="w-full py-4 pl-8 text-xl font-semibold mb-2 select-none cursor-pointer" class:bg-gray-200={active} class:shadow={active} class:hover:bg-prodmag-0={!active}>
    {text}
</a>

<style>
    a {
        -webkit-user-drag: none;
        user-drag: none;
    }
</style>