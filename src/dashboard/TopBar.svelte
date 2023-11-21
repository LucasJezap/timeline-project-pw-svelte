<script>
  import { toggleSidebar } from "./store";
  import { getUpcomingEvents } from "$lib/js/timeline-events";
  import { getCookie } from "svelte-cookie";
  import { onMount } from "svelte";

  let upcomingEvents = getUpcomingEvents();
  let filters = {};

  onMount(() => {
    filters["filter_title"] = getCookie("filter_title");
    filters["filter_description"] = getCookie("filter_description");
    filters["filter_from"] = getCookie("filter_from");
    filters["filter_to"] = getCookie("filter_to");
  });
</script>

<nav
  class="non-printable navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
>
  <button
    type="button"
    aria-expanded="false"
    aria-label="Toggle sidebar"
    class="text-4xl text-black focus:outline-none"
    on:click={toggleSidebar}
  >
    &#8801;
  </button>

  <div class="topbar-divider d-none d-sm-block" />

  <!-- Sidebar Toggle (Topbar) -->
  <button
    id="sidebarToggleTop"
    class="btn btn-link d-md-none rounded-circle mr-3"
  >
    <i class="fa fa-bars" />
  </button>

  <!-- Topbar Search -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#filterModal"
  >
    Filter
  </button>
  <!-- Topbar Navbar -->
  <ul class="navbar-nav ml-auto">
    <!-- Nav Item - Search Dropdown (Visible Only XS) -->
    <li class="nav-item dropdown no-arrow d-sm-none">
      <a
        class="nav-link dropdown-toggle"
        href="#/"
        id="searchDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-search fa-fw" />
      </a>
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
          <a class="dropdown-item d-flex align-items-center" href="#/">
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
      <!-- <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span
                      class="mr-2 d-none d-lg-inline text-gray-600 small"><?= auth()->user()->name ?></span>
                  <img class="img-profile rounded-circle"
                       onerror="this.onerror=null; this.src='{{ URL::to('images/undraw_profile.svg') }}'"
                       src="{{asset('storage/' . $user->avatar)}}">

              </a> -->
      <!-- Dropdown - User Information -->
      <div
        class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <a class="dropdown-item" href="#/">
          <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
          Profile
        </a>
        <a class="dropdown-item" href="#/">
          <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
          Settings
        </a>
        <div class="dropdown-divider" />
        <a
          class="dropdown-item"
          href="#/"
          data-toggle="modal"
          data-target="#logoutModal"
        >
          <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
          Logout
        </a>
      </div>
    </li>
    <div class="container">
      <a class="btn btn-success btn-sm" href="#/">
        <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400" />
        Login
      </a>
    </div>
  </ul>
</nav>

<!-- Logout Modal-->
<div
  class="non-printable modal fade"
  id="logoutModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        Select "Logout" below if you are ready to end your current session.
      </div>
      <form action="#/" method="post" style="display: inline" class="">
        @csrf
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal"
            >Cancel</button
          >
          <button class="btn btn-primary" type="submit">Logout</button>
        </div>
      </form>
    </div>
  </div>
</div>

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
        <div class="container-fluid">
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

            <!-- <div class="col-md-12" style="margin-top: 20px">
                            <div class="form-group">
                                <label for="category">Category</label>
                                <select multiple class="form-control" id="category" name="category[]"
                                        aria-label="category"
                                        style="width:100%;">
                                    <option <?php if (isset($_COOKIE['filter_category']) && str_contains($_COOKIE['filter_category'], $category->name)) {
                                        echo "selected";
                                    } ?> value="<?= $category->name ?>"><?= $category->name ?></option>
                                </select>
                            </div>
                        </div> -->

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
