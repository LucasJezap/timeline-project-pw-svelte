<script>
  import { toggleSidebar } from "./store";
  import { browser } from "$app/environment";
  import { getUpcomingEvents } from "$lib/js/timeline-events";
  import { categories, getCategoryByName } from "$lib/js/categories";
  import MultiSelect from "svelte-multiselect";
  import { getCookie, setCookie } from "svelte-cookie";
  import { onMount } from "svelte";
  import { changeUser } from "$lib/js/users";
  import { page } from '$app/stores';
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap";

  let searchText = "";
  let loading = false;
  let options = [];
  let selected = [];
  categories.forEach((category) => {
    options = [...options, category["name"]];
    if (category["check"]) {
      selected = [...selected, category["name"]];
    }
  });

  $: if (searchText) {
    loading = true;
    setTimeout(async () => {
      loading = false;
    }, 1000);
  }

  let filters = {};
  let user = $page.data.user; 
  let upcomingEvents = $page.data.upcomingEvents;
  let sortBy = "";

  onMount(() => {
    sortBy = getCookie("sort_by");
    filters["filter_title"] = getCookie("filter_title");
    filters["filter_description"] = getCookie("filter_description");
    filters["filter_from"] = getCookie("filter_from");
    filters["filter_to"] = getCookie("filter_to");
    filters["filter_category"] = [];

    let cookieCategories = getCookie("filter_category");
    if (cookieCategories !== "") {
      JSON.parse(getCookie("filter_category")).forEach((category) => {
        let cat = getCategoryByName(category);

        if (cat !== undefined) {
          filters["filter_category"] = [
            ...filters["filter_category"],
            cat["name"],
          ];
        }
      });
    }
  });

  const nextUser = function () {
    user = changeUser();
    upcomingEvents = getUpcomingEvents(user["id"]);
    router.redirect("/");
  };

  let fallbackImage = "images/undraw_profile.svg";
  const handleImageError = (ev) => (ev.target.src = fallbackImage);
</script>

<nav
  class="non-printable navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
>
  <button
    type="button"
    aria-expanded="false"
    aria-label="Toggle sidebar"
    class="text-4xl text-black focus:outline-none m-3"
    on:click={toggleSidebar}
  >
    &#8801;
  </button>

  {#if $page.data.showFilterAndSort !== undefined }
  <div class="topbar-divider d-none d-sm-block" />

  <!-- Topbar Search -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#filterModal"
  >
    Filter
  </button>

  <div class="topbar-divider d-none d-sm-block" />

  <Dropdown>
    <DropdownToggle caret color="danger">Sort By</DropdownToggle>
    <DropdownMenu>
      {#each ["id", "title", "start", "end", "description"] as value}
        {#each ["asc", "desc"] as order}
          <DropdownItem
            active={value + " " + order === sortBy}
            on:click={() => {
              sortBy = value + " " + order;
              setCookie("sort_by", sortBy, 365, true);
              if (browser) {
                window.location.reload();
              }
            }}
          >
            {value + " " + order}
          </DropdownItem>
        {/each}
      {/each}
    </DropdownMenu>
  </Dropdown>
  {/if}

  <!-- Topbar Navbar -->
  <ul class="navbar-nav ml-auto">
    <!-- Nav Item - Search Dropdown (Visible Only XS) -->
    <li class="nav-item dropdown no-arrow d-sm-none">
      <!-- Dropdown - Messages -->
      <div
        class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
        aria-labelledby="searchDropdown"
      >
        <form class="form-inline mr-auto w-100 navbar-search">
          <div class="input-group">
            <input
              type="text"
              class="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">
                <i class="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>

    <!-- Nav Item - Alerts -->
    <li class="nav-item dropdown no-arrow mx-1">
      <a
        class="nav-link dropdown-toggle"
        href="#/"
        id="alertsDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-bell fa-fw" />
        <!-- Counter - Alerts -->
        <span class="badge badge-danger badge-counter"
          >{upcomingEvents.length}</span
        >
      </a>
      <!-- Dropdown - Alerts -->
      <div
        class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="alertsDropdown"
      >
        <h6 class="dropdown-header">Alerts Center</h6>
        {#each upcomingEvents as event}
          <a class="dropdown-item d-flex align-items-center" target="_blank" href="https://www.cinema-city.pl/search?query={event["title"]}">
            <div class="mr-3">
              <div class="icon-circle bg-primary">
                <i class="fas fa-file-alt text-white" />
              </div>
            </div>
            <div>
              <div class="small text-gray-500">
                {event["start"].toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <span class="font-weight-bold whitespace-no-wrap"
                >'{event["title"]}' is releasing soon!. Get your ticket here!</span
              >
            </div>
          </a>
        {/each}
      </div>
    </li>

    <div class="topbar-divider d-none d-sm-block" />

    <!-- Nav Item - User Information -->
    <li class="nav-item dropdown no-arrow">
      <a
        class="nav-link dropdown-toggle"
        href="#/"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="mr-2 d-none d-lg-inline text-gray-600 small"
          >{user["name"]}</span
        >
        <img
          class="img-profile rounded-circle"
          on:error={handleImageError}
          src={"/profile/" + user["avatar"]}
          alt="..."
        />
      </a>
      <!-- Dropdown - User Information -->
      <div
        class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <a class="dropdown-item" href="/profile/{user['id']}">
          <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
          Profile
        </a>
        <a class="dropdown-item" href="/settings/{user['id']}">
          <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
          Settings
        </a>
        <div class="dropdown-divider" />
        <a href="#/" class="dropdown-item" on:click={nextUser}>
          <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
          Change to next user
        </a>
      </div>
    </li>
  </ul>
</nav>

<!-- Filter Modal Start-->
<div
  class="modal fade text-center"
  id="filterModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="Filter data dialog"
>
  <div
    class="modal-dialog d-inline-block"
    style="max-width: 100%;width: auto !important;"
  >
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Close</span>
        </button>
      </div>
      <h1>Filter Data</h1>

      <!-- Modal Body -->
      <div class="modal-body">
        <div class="container">
          <form method="post" class="form-inline" id="filter_form">
            <div class="col-md-12">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  aria-label="title"
                  style="width:100%;"
                  value={filters["filter_title"]}
                />
              </div>
            </div>

            <div class="col-md-12" style="margin-top: 20px">
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  name="description"
                  aria-label="description"
                  style="width:100%;"
                  value={filters["filter_description"]}
                />
              </div>
            </div>

            <div class="col-md-12" style="margin-top: 20px">
              <div class="form-group">
                <label for="from">From</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  id="from"
                  name="from"
                  aria-label="from"
                  style="width:100%"
                  value={filters["filter_from"]}
                />
              </div>
            </div>

            <div class="col-md-12" style="margin-top: 20px">
              <div class="form-group">
                <label for="to">To</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  id="to"
                  name="to"
                  aria-label="to"
                  style="width:100%;"
                  value={filters["filter_to"]}
                />
              </div>
            </div>

            <div class="col-md-12" style="margin-top: 20px">
              <div class="form-group">
                <label for="category">Category</label>
                <div class="container-fluid">
                  <MultiSelect
                    id="category"
                    name="category"
                    bind:options
                    bind:selected={filters["filter_category"]}
                    bind:searchText
                    {loading}
                  />
                </div>
              </div>
            </div>

            <div
              class="col-md-12"
              style="padding-top: 2rem; margin-bottom: 20px"
            >
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                formaction="?/addFilters"
              >
                Filter
              </button>
              <button
                type="submit"
                class="btn btn-primary submitBtn"
                formaction="?/deleteFilters"
              >
                Clear All Filters
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"
          >Close</button
        >
      </div>
    </div>
  </div>
</div>
<!--Filter Modal End-->