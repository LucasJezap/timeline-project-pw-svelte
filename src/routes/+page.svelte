<script>
  import { getCookie } from "svelte-cookie";
  import { onMount } from "svelte";

  export let data;
  let events = data["timelineEvents"];

  onMount(() => {
    let sortSplit = getCookie("sort_by").split(" ");

    if (sortSplit.length === 2) {
      let sortBy = sortSplit[0];
      if (events.length > 0 && typeof events[0][sortBy] === "string") {
        events = [...data["timelineEvents"]].sort((a, b) => {
          if (sortSplit[1] === "asc") {
            return a[sortBy].localeCompare(b[sortBy]);
          } else {
            return b[sortBy].localeCompare(a[sortBy]);
          }
        });
      } else {
        events = [...data["timelineEvents"]].sort((a, b) => {
          if (sortSplit[1] === "asc") {
            return a[sortBy] - b[sortBy];
          } else {
            return b[sortBy] - a[sortBy];
          }
        });
      }
    }
  });

  let fallbackImage = "images/undraw_poster.png";

  const handleImageError = (ev) => (ev.target.src = fallbackImage);
</script>

<svelte:head>
  <title>Timeline Manager - Dashboard</title>
</svelte:head>

<div class="container py-5">
  <div class="main-timeline-4 text-white">
    {#each events as event, key}
      <div class={key % 2 == 0 ? "timeline-4 left-4" : "timeline-4 right-4"}>
        <div
          class={key % 2 == 0
            ? "card gradient-custom"
            : "card gradient-custom-4"}
        >
          <div id="timeline" class="card-body p-4">
            <i class="fas fa-camera fa-2x mb-3" />
            <h4>{event["title"]}</h4>
            <img
              src={"event/" + event["image"]}
              on:error={handleImageError}
              class="img-fluid"
              style="max-width: 25%; max-height: 50%"
              alt=""
            />
            <p class="small text-white-50 mb-4">
              {event["start"].toLocaleDateString("en-us", {
                day: "numeric",
                month: "short",
              })} - {event["end"].toLocaleDateString("en-us", {
                day: "numeric",
                month: "short",
              })}
            </p>
            <p>
              {event["description"].length > 160
                ? event["description"].substring(
                    0,
                    event["description"].substring(0, 160).lastIndexOf(" ")
                  ) + "..."
                : event["description"]}
            </p>
            {#each event["categories"] as category}
              <a
                href="/category/{category['id']}"
                class="btn-primary btn-md bg-transparent"
                style="border: none;"
                ><h6
                  style="background-color: {category['color']}"
                  class="badge text-white mb-0"
                >
                  {category["name"]}
                </h6></a
              >
            {/each}
          </div>
          <a
            href="/event/{event['id']}"
            class="btn btn-primary btn-md bg-transparent align-self-lg-end"
            style="border: none;"
            >Details
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* The actual timeline (the vertical ruler) */
  .main-timeline-4 {
    position: relative;
  }

  /* The actual timeline (the vertical ruler) */
  .main-timeline-4::after {
    content: "";
    position: absolute;
    width: 3px;
    background-color: #bbb;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }

  /* Container around content */
  .timeline-4 {
    position: relative;
    background-color: inherit;
    width: 50%;
  }

  /* The circles on the timeline */
  .timeline-4::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    right: -11px;
    background-color: #bbb;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  /* Place the container to the left */
  .left-4 {
    padding: 0px 40px 20px 0px;
    left: 0;
  }

  /* Place the container to the right */
  .right-4 {
    padding: 0px 0px 20px 40px;
    left: 50%;
  }

  /* Add arrows to the left container (pointing right) */
  .left-4::before {
    content: " ";
    position: absolute;
    top: 18px;
    z-index: 1;
    right: 30px;
    border: medium solid rgba(37, 117, 252, 1);
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent rgba(37, 117, 252, 1);
  }

  /* Add arrows to the right container (pointing left) */
  .right-4::before {
    content: " ";
    position: absolute;
    top: 18px;
    z-index: 1;
    left: 30px;
    border: medium solid rgba(245, 87, 108, 1);
    border-width: 10px 10px 10px 0;
    border-color: transparent rgba(245, 87, 108, 1) transparent transparent;
  }

  /* Fix the circle for containers on the right side */
  .right-4::after {
    left: -14px;
  }

  /* Media queries - Responsive timeline on screens less than 600px wide */
  @media screen and (max-width: 600px) {
    /* Place the timelime to the left */
    .main-timeline-4::after {
      left: 31px;
    }

    /* Full-width containers */
    .timeline-4 {
      width: 100%;
      padding-left: 70px;
      padding-right: 25px;
    }

    /* Make sure that all arrows are pointing leftwards */
    .timeline-4::before {
      left: 60px;
      border: medium solid white;
      border-width: 10px 10px 10px 0;
      border-color: transparent white transparent transparent;
    }

    /* Make sure all circles are at the same spot */
    .left-4::after,
    .right-4::after {
      left: 18px;
    }

    .left-4::before {
      right: auto;
    }

    /* Make all right containers behave like the left ones */
    .right-4 {
      left: 0%;
    }
  }

  .gradient-custom {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
      to right,
      rgba(106, 17, 203, 1),
      rgba(37, 117, 252, 1)
    );

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
      to right,
      rgba(106, 17, 203, 1),
      rgba(37, 117, 252, 1)
    );
  }

  .gradient-custom-4 {
    /* fallback for old browsers */
    background: #f093fb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
      to left,
      rgba(240, 147, 251, 1),
      rgba(245, 87, 108, 1)
    );

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
      to left,
      rgba(240, 147, 251, 1),
      rgba(245, 87, 108, 1)
    );
  }

  #timeline {
    position: relative;
  }

  #timeline img {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
