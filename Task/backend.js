function optionGenerator(platform) {
  if (platform == "youtube") {
    return "subscribers";
  } else {
    return "followers";
  }
}

function followersGenerator(followers) {
  if (followers.length > 6) {
    return parseInt(followers / 1000000) + "m";
  } else if (followers.length > 4) {
    return parseInt(followers / 1000) + "k";
  } else {
    return followers;
  }
}

{
  /* <div class="col-12 col-md-3">
  <div class="item">
    <div class="item-border"></div>
    <div class="item-wrapper p-2 d-flex flex-column justify-content-center align-items-center">
      <div class="item-social d-flex align-items-center justify-content-center gap-1">
        <div class="item-social-logo d-flex align-items-center justify-content-center">
          <i class="fa-brands fa-square-facebook"></i>
        </div>
        <div class="item-social-user">@nathanf</div>
      </div>
      <div class="item-number-followers">1987</div>
      <div class="followers-text">followers</div>
      <div class="item-today my-3 d-flex align-items-center justify-content-center gap-2">
        <i class="fa-solid fa-caret-up mt-1"></i>
        <div class="today-text">99 today</div>
      </div>
    </div>
  </div>
</div>; */
}

function createItem(item) {
  return $("<div></div>")
    .addClass("col-12 col-md-3")
    .append(
      $("<div></div>")
        .addClass("item")
        .append($("<div></div>").addClass("item-border " + item.platform))
        .append(
          $("<div></div>")
            .addClass(
              "item-wrapper p-2 d-flex flex-column justify-content-center align-items-center"
            )
            .append(
              $("<div></div>")
                .addClass(
                  "item-social d-flex align-items-center justify-content-center gap-1"
                )
                .append(
                  $("<div></div>")
                    .addClass(
                      "item-social-logo d-flex align-items-center justify-content-center"
                    )
                    .append(
                      $("<i></i>").addClass(
                        "fa-brands fa-square-" +
                          item.platform +
                          " " +
                          item.platform
                      )
                    )
                )
                .append(
                  $("<div></div>").addClass("item-social-user").text(item.user)
                )
            )
            .append(
              $("<div></div>")
                .addClass("item-number-followers")
                .text(followersGenerator(item.followers))
            )
            .append(
              $("<div></div>")
                .addClass("followers-text")
                .text(optionGenerator(item.platform))
            )
            .append(
              $("<div></div>")
                .addClass(
                  "item-today my-3 d-flex align-items-center justify-content-center gap-2"
                )
                .append($("<i></i>").addClass("fa-solid fa-caret-up mt-1"))
                .append(
                  $("<div></div>")
                    .addClass("today-text")
                    .text(Math.floor(Math.random() * 100) + 1 + " today")
                )
            )
        )
    );
}

var itemsArray = [];
function localStorageArray() {
  if (JSON.parse(localStorage.getItem("items"))) {
    var tmp = localStorage.getItem("items");
    itemsArray = JSON.parse(tmp);
  }
}

function totalFollowers() {
  var counter = 0;
  for (let index = 0; index < itemsArray.length; index++) {
    counter = counter + parseInt(itemsArray[index].followers);
  }
  return $(".main-subtitle").text(
    "Total Followers: " + followersGenerator("" + counter)
  );
}

function switchTheme() {
  if ($("body").hasClass("theme-dark")) {
    $(".theme-dark").addClass("theme-light").removeClass("theme-dark");
  } else if ($("body").hasClass("theme-light")) {
    $(".theme-light").addClass("theme-dark").removeClass("theme-light");
  }
}

$(document).ready(function () {
  $(".form-submit").on("click", function (e) {
    if ($("#user").val() == "" || $("#followers-num").val() == "") {
      return;
    }
    var item = {
      user: $("#user").val(),
      followers: $("#followers-num").val(),
      option: optionGenerator($("#platform").val()),
      platform: $("#platform").val().toLowerCase(),
    };

    itemsArray.push(item);

    localStorage.setItem("items", JSON.stringify(itemsArray));
  });
  localStorageArray();
  totalFollowers();

  if (document.getElementsByClassName("items-row").length > 0) {
    for (let index = 0; index < itemsArray.length; index++) {
      $(".items-row").append(createItem(itemsArray[index]));
    }
  }

  $(".form-check-input").on("click", switchTheme);
  $(".overview-item-footer-title").text(Math.floor(Math.random() * 100) + 1);
});
