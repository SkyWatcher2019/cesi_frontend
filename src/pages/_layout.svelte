<script>
    import { isActive, url } from '@roxi/routify'

    import Notification from '../components/icons/Notification.svelte';
    import SidebarItem from '../components/SidebarItem.svelte';
    import AppDecorator from '../components/AppDecorator.svelte';

    const sidebar_routes = [
        ['Продукты', '/index'],
        ['Отделы', '/sections'],
        ['Продажи', '/sells'],
        ['Отчеты', '/reports'],
    ];
</script>


<nav class="fixed top-[3rem] left-0 h-full w-[12rem] bg-prodmag-10">
    <div class="mt-3 flex flex-col">
        {#each sidebar_routes as [name, link]}
            <SidebarItem text={name} url={$url(link)} active={$isActive(link) || ($isActive('/index') && link === '/')}/>
        {/each}
    </div>
</nav>


<header class="fixed top-0 left-0 w-full h-[3rem] bg-prodmag-0 flex flex-row items-center justify-between py-2 px-12 shadow">
    <div class='flex flex-row items-center'>
        <a href='/' class='text-2xl font-semibold select-none cursor-pointer'>Продмаг</a>
    </div>
</header>

<div class="pl-[12rem] pt-[3rem]">
    <slot decorator={AppDecorator}/>
</div>