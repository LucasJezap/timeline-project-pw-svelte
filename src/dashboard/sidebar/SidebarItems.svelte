<script>
  import { onMount } from "svelte";
  import { data } from "./data";
  import { page } from "$app/stores";
  import { closeSidebar, sidebarOpen } from "../store";

  let currentSection = "";

  const updateCurrentSection = (section) => {
    currentSection = section;
    if (window.innerWidth > 1024) {
      closeSidebar();
    }
  };

  onMount(() => {
    const sidebarData = data.flatMap((section) => {
      return section.content.map((content) => {
        if (content.link === "/profile" || content.link === "/settings") {
          content.link += "/" + $page.data.user["id"];
        }

        return {
          title: content.title,
          link: content.link,
          section: section.section,
        };
      });
    });

    currentSection =
      sidebarData.find((item) => item.link === $page.url.pathname)?.section ??
      "Main";
  });
</script>

<div class="flex h-full w-full">
  <div class="h-full bg-fuchsia-950 pt-10">
    {#each data as { icon, section } (section)}
      <div
        class="mx-4 my-1 flex w-full items-center justify-start p-3 text-white"
      >
        <button on:click={() => updateCurrentSection(section)}>
          <div>
            <div
              class={`flex h-8 w-8 items-center justify-center ${
                section === currentSection && "rounded-full bg-fuchsia-800"
              }`}
            >
              <i class={icon} />
            </div>
          </div>
        </button>
      </div>
    {/each}
  </div>

  {#if !$sidebarOpen || window.innerWidth < 1024}
    <div class="h-full w-full bg-fuchsia-900 pt-5">
      {#each data as { section, content } (section)}
        <div>
          {#if section === currentSection}
            <div>
              <div class="pl-3 text-lg font-medium text-white">
                {section}
              </div>
              <ul class="list-disc px-8 pt-6 text-white">
                {#each content as item (item.title)}
                  <li>
                    <a
                      href={item.link}
                      class={`py-3 block pl-3 text-sm font-normal text-white  ${
                        item.link === $page.url.pathname &&
                        "rounded-md bg-fuchsia-800"
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
